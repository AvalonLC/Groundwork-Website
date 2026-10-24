/* ============================================================
   Groundwork AI — chat widget client behavior.
   Handles: open/close + focus management, session continuity across page
   navigation (sessionStorage-backed session id), SSE streaming from
   /api/chat, tool-result rendering (pricing card, nav links, lead
   confirmation), loading/error states, and graceful degraded-mode display.
   No inline <script> — loaded as a static file (CSP has no script-src
   'unsafe-inline' — see src/index.tsx).
   ============================================================ */
(function () {
  var SESSION_KEY = 'gw_chat_session_id'
  var HISTORY_KEY = 'gw_chat_history_v1' // small UI-only transcript cache for visual continuity across navigation

  function genId() {
    var bytes = new Uint8Array(16)
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes)
    else for (var i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
    return Array.prototype.map.call(bytes, function (b) { return b.toString(16).padStart(2, '0') }).join('')
  }

  function getSessionId() {
    try {
      var id = sessionStorage.getItem(SESSION_KEY)
      if (!id) {
        id = genId()
        sessionStorage.setItem(SESSION_KEY, id)
      }
      return id
    } catch (e) {
      // sessionStorage unavailable (private mode edge cases) — fall back to
      // an in-memory id that still works for the current page view.
      return genId()
    }
  }

  function loadHistory() {
    try {
      var raw = sessionStorage.getItem(HISTORY_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  }

  function saveHistoryEntry(entry) {
    try {
      var hist = loadHistory()
      hist.push(entry)
      if (hist.length > 50) hist = hist.slice(hist.length - 50)
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(hist))
    } catch (e) {
      /* non-fatal */
    }
  }

  // Contextual per-page opening message + quick-reply chips. Matched by
  // longest path-prefix. Kept intentionally small and hand-curated (same
  // "no vector search / hand-maintained knowledge" posture as the rest of
  // Groundwork AI) — client-side only, no extra network call, no effect on
  // the tool loop or budget.
  var PAGE_CONTEXT = [
    { prefix: '/pricing', welcome: "Hi — I'm Groundwork AI. Looking at pricing? I can estimate a real total for your team, or compare two plans side by side.", chips: ['Compare Growth vs Pro', 'Estimate pricing for my team', 'Is there a free trial?'] },
    { prefix: '/trades/', welcome: "Hi — I'm Groundwork AI. I can tell you how Groundwork fits this trade, or get you a pricing estimate.", chips: ['How does this fit my trade?', 'What does it cost?', 'Talk to the team'] },
    { prefix: '/trades', welcome: "Hi — I'm Groundwork AI. Tell me your trade and I'll point you to the right page.", chips: ['I run a landscaping company', 'I run an HVAC company', 'See all trades'] },
    { prefix: '/explore', welcome: "Hi — I'm Groundwork AI. This is our interactive sample workspace — ask me what any panel is showing, or where to look first.", chips: ['What am I looking at?', 'Show me the dispatch board', 'Is this real customer data?'] },
    { prefix: '/demo', welcome: "Hi — I'm Groundwork AI. Ready to pick a time? I can hand you the real booking calendar, or answer questions first.", chips: ['What happens on the call?', 'I have questions first', 'Estimate pricing for my team'] },
    { prefix: '/roles', welcome: "Hi — I'm Groundwork AI. I can explain how Groundwork works for a specific role — owner, office manager, sales rep, foreman, or laborer.", chips: ['What does the owner see?', 'What does field crew see?', 'Estimate pricing for my team'] },
    { prefix: '/product', welcome: "Hi — I'm Groundwork AI. Ask me about any part of the platform, or I can get you a pricing estimate.", chips: ['What does this feature do?', 'Estimate pricing for my team', 'How long does setup take?'] },
    { prefix: '/features', welcome: "Hi — I'm Groundwork AI. Ask about any feature, or see how much time it could save your team.", chips: ['Estimate my time savings', 'Estimate pricing for my team', 'How does this compare to what I use now?'] },
  ]
  var DEFAULT_CHIPS = ['Estimate pricing for my team', 'What trades do you support?', 'Talk to the team']

  function getPageContext(path) {
    var best = null
    for (var i = 0; i < PAGE_CONTEXT.length; i++) {
      var entry = PAGE_CONTEXT[i]
      if (path.indexOf(entry.prefix) === 0 && (!best || entry.prefix.length > best.prefix.length)) best = entry
    }
    return best
  }

  function bindChatWidget() {
    var root = document.querySelector('[data-gw-chat-root]')
    if (!root) return

    var launcher = root.querySelector('[data-gw-chat-launcher]')
    var panel = root.querySelector('[data-gw-chat-panel]')
    var closeBtn = root.querySelector('[data-gw-chat-close]')
    var backdrop = root.querySelector('[data-gw-chat-backdrop]')
    var log = root.querySelector('[data-gw-chat-log]')
    var statusEl = root.querySelector('[data-gw-chat-status]')
    var form = root.querySelector('[data-gw-chat-form]')
    var input = root.querySelector('[data-gw-chat-input]')
    var sendBtn = root.querySelector('[data-gw-chat-send]')
    var quickReplies = root.querySelector('[data-gw-chat-quickreplies]')
    var currentPath = root.getAttribute('data-gw-chat-path') || window.location.pathname

    var sessionId = getSessionId()
    var isStreaming = false
    var lastFocusedBeforeOpen = null

    // Restore prior transcript on page load for visual continuity across
    // navigation within the same browser session (requirement: "conversation
    // continuity during site navigation"). The SERVER already has full
    // continuity via sessionId regardless — this just re-renders the UI.
    function restoreHistory() {
      var hist = loadHistory()
      if (!hist.length) {
        // Fresh conversation — apply a contextual welcome message + quick
        // replies for the current page instead of the generic default.
        var ctx = getPageContext(currentPath)
        if (ctx) {
          var welcomeEl = log.querySelector('[data-gw-chat-welcome]')
          if (welcomeEl) welcomeEl.textContent = ctx.welcome
        }
        renderQuickReplies(ctx ? ctx.chips : DEFAULT_CHIPS)
        return
      }
      var welcome = log.querySelector('[data-gw-chat-welcome]')
      if (welcome) welcome.remove()
      if (quickReplies) quickReplies.remove()
      hist.forEach(function (entry) {
        if (entry.kind === 'bubble') appendBubble(entry.role, entry.text, false)
        else if (entry.kind === 'card') appendCardHtml(entry.html, false)
      })
      scrollToBottom()
    }

    // Quick-reply suggestion chips — shown only on a fresh conversation (no
    // prior history) to help a visitor get started without typing. Clicking
    // one sends it exactly like typed input; chips are cleared once the
    // visitor sends their first message.
    function renderQuickReplies(suggestions) {
      if (!quickReplies || !suggestions || !suggestions.length) return
      quickReplies.innerHTML = ''
      suggestions.forEach(function (text) {
        var btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'gw-chat-quickreply-chip'
        btn.textContent = text
        btn.addEventListener('click', function () {
          clearQuickReplies()
          sendMessage(text)
        })
        quickReplies.appendChild(btn)
      })
    }

    function clearQuickReplies() {
      if (quickReplies) quickReplies.innerHTML = ''
    }

    function scrollToBottom() {
      log.scrollTop = log.scrollHeight
    }

    function escapeHtml(s) {
      var div = document.createElement('div')
      div.textContent = s
      return div.innerHTML
    }

    function appendBubble(role, text, persist) {
      var div = document.createElement('div')
      div.className = 'gw-chat-bubble ' + (role === 'user' ? 'gw-chat-bubble-user' : role === 'error' ? 'gw-chat-bubble-error' : 'gw-chat-bubble-ai')
      div.textContent = text
      log.appendChild(div)
      scrollToBottom()
      if (persist !== false) saveHistoryEntry({ kind: 'bubble', role: role, text: text })
      return div
    }

    function appendCardHtml(html, persist) {
      var div = document.createElement('div')
      div.className = 'gw-chat-card'
      div.innerHTML = html
      log.appendChild(div)
      scrollToBottom()
      if (persist !== false) saveHistoryEntry({ kind: 'card', html: html })
      return div
    }

    function setStatus(text, isError) {
      if (!text) {
        statusEl.hidden = true
        statusEl.textContent = ''
        statusEl.classList.remove('is-error')
        return
      }
      statusEl.hidden = false
      statusEl.textContent = text
      statusEl.classList.toggle('is-error', !!isError)
    }

    function setInputDisabled(disabled) {
      input.disabled = disabled
      sendBtn.disabled = disabled
    }

    function renderToolResultCard(name, result) {
      if (!result || result.ok === false) return // errors are summarized by the assistant's own text, not a card
      var data = result.data || {}
      if (name === 'get_pricing_estimate') {
        var totalLine = data.isCustomAi
          ? '$' + (data.basePrice + data.additionalUsersCost).toLocaleString() + ' + AI (contact sales)'
          : '$' + Number(data.grandTotal).toLocaleString() + '/mo'
        var assumptionsHtml = (data.assumptions || []).map(function (a) { return '<div>' + escapeHtml(a) + '</div>' }).join('')
        appendCardHtml(
          '<div class="gw-chat-card-title">' + escapeHtml(data.planName || '') + ' plan estimate</div>' +
          '<div class="gw-chat-card-total"><span>Estimated total</span><span>' + totalLine + '</span></div>' +
          '<div class="gw-chat-card-assumptions">' + assumptionsHtml + '</div>'
        )
      } else if (name === 'compare_plans') {
        var featureListHtml = function (features) {
          if (!features || !features.length) return '<div class="gw-chat-card-line"><span>No additional features at this tier.</span></div>'
          return features.map(function (f) { return '<div class="gw-chat-compare-feature">+ ' + escapeHtml(f) + '</div>' }).join('')
        }
        appendCardHtml(
          '<div class="gw-chat-card-title">' + escapeHtml(data.planA.name) + ' vs ' + escapeHtml(data.planB.name) + '</div>' +
          '<div class="gw-chat-compare-grid">' +
            '<div class="gw-chat-compare-col">' +
              '<div class="gw-chat-compare-col-title">' + escapeHtml(data.planA.name) + '</div>' +
              '<div class="gw-chat-compare-col-price">$' + Number(data.planA.basePrice).toLocaleString() + '/mo</div>' +
              '<div class="gw-chat-compare-col-sub">' + data.planA.includedUsers + ' user' + (data.planA.includedUsers === 1 ? '' : 's') + ' included \u00b7 $' + data.planA.perUserPrice + '/mo each after</div>' +
              '<div class="gw-chat-compare-col-sub">' + escapeHtml(data.planA.aiAllowance) + '</div>' +
              featureListHtml(data.onlyInA) +
            '</div>' +
            '<div class="gw-chat-compare-col">' +
              '<div class="gw-chat-compare-col-title">' + escapeHtml(data.planB.name) + '</div>' +
              '<div class="gw-chat-compare-col-price">$' + Number(data.planB.basePrice).toLocaleString() + '/mo</div>' +
              '<div class="gw-chat-compare-col-sub">' + data.planB.includedUsers + ' user' + (data.planB.includedUsers === 1 ? '' : 's') + ' included \u00b7 $' + data.planB.perUserPrice + '/mo each after</div>' +
              '<div class="gw-chat-compare-col-sub">' + escapeHtml(data.planB.aiAllowance) + '</div>' +
              featureListHtml(data.onlyInB) +
            '</div>' +
          '</div>' +
          '<div class="gw-chat-card-assumptions">' + (data.assumptions || []).map(function (a) { return '<div>' + escapeHtml(a) + '</div>' }).join('') + '</div>'
        )
      } else if (name === 'calculate_roi') {
        var netLine = data.netMonthlyValueUsd !== null && data.netMonthlyValueUsd !== undefined
          ? '<div class="gw-chat-card-total"><span>Net monthly value</span><span>' + (data.netMonthlyValueUsd >= 0 ? '+' : '') + '$' + Number(data.netMonthlyValueUsd).toLocaleString() + '/mo</span></div>'
          : ''
        appendCardHtml(
          '<div class="gw-chat-card-title">Estimated time &amp; cost savings</div>' +
          '<div class="gw-chat-card-line"><span>Hours saved</span><strong>' + data.hoursSavedPerWeek + ' hrs/week</strong></div>' +
          '<div class="gw-chat-card-line"><span>Estimated value</span><strong>$' + Number(data.dollarsSavedPerMonth).toLocaleString() + '/mo</strong></div>' +
          (data.subscriptionCostUsd !== null && data.subscriptionCostUsd !== undefined ? '<div class="gw-chat-card-line"><span>Plan cost</span><strong>-$' + Number(data.subscriptionCostUsd).toLocaleString() + '/mo</strong></div>' : '') +
          netLine +
          '<div class="gw-chat-card-assumptions">' + (data.assumptions || []).map(function (a) { return '<div>' + escapeHtml(a) + '</div>' }).join('') + '</div>'
        )
      } else if (name === 'recommend_trade_page') {
        appendCardHtml(
          '<div class="gw-chat-card-title">' + escapeHtml(data.name || '') + '<span class="gw-chat-card-badge gw-chat-card-badge-live">Live</span></div>' +
          '<div class="gw-chat-card-line"><span>' + escapeHtml(data.summary || '') + '</span></div>' +
          '<a class="gw-chat-card-link" href="' + escapeHtml(data.url) + '">View ' + escapeHtml(data.name || 'page') + '</a>'
        )
      } else if (name === 'jump_to_demo_panel') {
        var badgeClass = data.status === 'live' ? 'gw-chat-card-badge-live' : 'gw-chat-card-badge-demo'
        var badgeLabel = data.status === 'live' ? 'Live' : 'Demo illustration'
        appendCardHtml(
          '<div class="gw-chat-card-title">' + escapeHtml(data.label || '') + '<span class="gw-chat-card-badge ' + badgeClass + '">' + badgeLabel + '</span></div>' +
          '<div class="gw-chat-card-line"><span>' + escapeHtml(data.description || '') + '</span></div>' +
          '<a class="gw-chat-card-link" href="' + escapeHtml(data.url) + '" data-gw-chat-track="demo_panel_clicked">Open in the demo</a>'
        )
      } else if (name === 'get_booking_link') {
        appendCardHtml(
          '<div class="gw-chat-card-title">Pick your own time</div>' +
          '<div class="gw-chat-card-line"><span>' + escapeHtml(data.note || '') + '</span></div>' +
          '<a class="gw-chat-card-link" href="' + escapeHtml(data.url) + '" data-gw-chat-track="booking_link_clicked">Go to booking calendar</a>'
        )
      } else if (name === 'capture_lead') {
        appendCardHtml(
          '<div class="gw-chat-card-title">' + (data.status === 'already_received' ? 'Already on file' : 'Request sent') + '</div>' +
          '<div class="gw-chat-card-line"><span>' + escapeHtml(data.message || '') + '</span></div>'
        )
      }
    }

    // Tracks booking-link / demo-panel clicks originating from chat cards as
    // a lightweight client-side signal in addition to the server-side event
    // already logged when the tool ran — belt-and-suspenders for requirement
    // #7 ("relevant demo-panel clicks... reported separately").
    log.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('[data-gw-chat-track]')
      if (!el) return
      // Server already logged the canonical event when the tool executed;
      // this click is purely informational navigation, no extra network call needed.
    })

    function openPanel() {
      lastFocusedBeforeOpen = document.activeElement
      panel.hidden = false
      backdrop.hidden = false
      requestAnimationFrame(function () {
        panel.classList.add('open')
      })
      launcher.setAttribute('aria-expanded', 'true')
      input.focus()
      document.addEventListener('keydown', onKeydown)
    }

    function closePanel() {
      panel.classList.remove('open')
      launcher.setAttribute('aria-expanded', 'false')
      document.removeEventListener('keydown', onKeydown)
      setTimeout(function () {
        panel.hidden = true
        backdrop.hidden = true
      }, 220)
      if (lastFocusedBeforeOpen && lastFocusedBeforeOpen.focus) lastFocusedBeforeOpen.focus()
      else launcher.focus()
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        closePanel()
        return
      }
      if (e.key === 'Tab') {
        // Simple focus trap: cycle between the first/last focusable elements.
        var focusables = panel.querySelectorAll('button, input, a[href]')
        if (!focusables.length) return
        var first = focusables[0]
        var last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    launcher.addEventListener('click', openPanel)
    closeBtn.addEventListener('click', closePanel)
    backdrop.addEventListener('click', closePanel)

    async function sendMessage(text) {
      if (isStreaming) return
      isStreaming = true
      setInputDisabled(true)
      setStatus('')

      appendBubble('user', text)

      var typingEl = document.createElement('div')
      typingEl.className = 'gw-chat-typing'
      typingEl.innerHTML = '<span class="gw-chat-dot"></span><span class="gw-chat-dot"></span><span class="gw-chat-dot"></span>'
      log.appendChild(typingEl)
      scrollToBottom()

      var assistantBubble = null
      var assistantText = ''

      function ensureAssistantBubble() {
        if (!assistantBubble) {
          if (typingEl.parentNode) typingEl.remove()
          assistantBubble = document.createElement('div')
          assistantBubble.className = 'gw-chat-bubble gw-chat-bubble-ai'
          log.appendChild(assistantBubble)
        }
        return assistantBubble
      }

      // Thumbs up/down on the finished reply. Rendered once the turn is
      // "done" and we have the server-side message id to rate against.
      // Not persisted into the history cache (ratings don't survive a page
      // reload — acceptable for Phase 1; the server-side vote itself does).
      function renderRating(messageId) {
        if (!messageId) return
        var wrap = document.createElement('div')
        wrap.className = 'gw-chat-rating'
        var upBtn = document.createElement('button')
        upBtn.type = 'button'
        upBtn.className = 'gw-chat-rating-btn'
        upBtn.setAttribute('aria-label', 'Helpful')
        upBtn.innerHTML = '\u{1F44D}'
        var downBtn = document.createElement('button')
        downBtn.type = 'button'
        downBtn.className = 'gw-chat-rating-btn'
        downBtn.setAttribute('aria-label', 'Not helpful')
        downBtn.innerHTML = '\u{1F44E}'

        function submitRating(value) {
          upBtn.disabled = true
          downBtn.disabled = true
          upBtn.classList.toggle('is-active-up', value === 'up')
          downBtn.classList.toggle('is-active-down', value === 'down')
          var thanks = document.createElement('span')
          thanks.className = 'gw-chat-rating-thanks'
          thanks.textContent = 'Thanks for the feedback'
          wrap.appendChild(thanks)
          fetch('/api/chat/rate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: sessionId, messageId: messageId, rating: value }),
          }).catch(function () { /* best-effort — UI already reflects the vote */ })
        }

        upBtn.addEventListener('click', function () { submitRating('up') })
        downBtn.addEventListener('click', function () { submitRating('down') })
        wrap.appendChild(upBtn)
        wrap.appendChild(downBtn)
        log.appendChild(wrap)
        scrollToBottom()
      }

      try {
        var res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionId, path: currentPath, message: text }),
        })

        if (res.status === 429 || res.status === 200 && res.headers.get('content-type') && res.headers.get('content-type').indexOf('application/json') !== -1) {
          // Degraded / rate-limited JSON response (not an SSE stream).
          var json = await res.json()
          if (typingEl.parentNode) typingEl.remove()
          if (json.degraded) {
            appendBubble('ai', json.error || "Groundwork AI is temporarily unavailable. You can still book a demo or email tyler@groundwork-crm.com directly.")
            appendCardHtml(
              '<div class="gw-chat-card-title">Keep going without the chat</div>' +
              '<a class="gw-chat-card-link" href="' + escapeHtml(json.bookingUrl || '/demo') + '">Book a demo</a>' +
              '<div class="gw-chat-card-line" style="margin-top:8px;"><span>Or email <a href="mailto:' + escapeHtml(json.email || 'tyler@groundwork-crm.com') + '">' + escapeHtml(json.email || 'tyler@groundwork-crm.com') + '</a></span></div>'
            )
          } else {
            appendBubble('error', json.error || 'Something went wrong — please try again.')
          }
          return
        }

        if (!res.ok || !res.body) {
          if (typingEl.parentNode) typingEl.remove()
          appendBubble('error', "Groundwork AI hit an error. You can still book a demo or email tyler@groundwork-crm.com directly.")
          return
        }

        var reader = res.body.getReader()
        var decoder = new TextDecoder()
        var buffer = ''

        while (true) {
          var chunk = await reader.read()
          if (chunk.done) break
          buffer += decoder.decode(chunk.value, { stream: true })
          var events = buffer.split('\n\n')
          buffer = events.pop() || ''
          for (var i = 0; i < events.length; i++) {
            var block = events[i]
            var eventType = 'message'
            var dataLines = []
            block.split('\n').forEach(function (line) {
              if (line.indexOf('event:') === 0) eventType = line.slice(6).trim()
              else if (line.indexOf('data:') === 0) dataLines.push(line.slice(5).trim())
            })
            var data = dataLines.join('\n')
            if (eventType === 'token') {
              assistantText += data
              ensureAssistantBubble().textContent = assistantText
              scrollToBottom()
            } else if (eventType === 'tool_call') {
              // Could show a subtle "using tool X" indicator; kept quiet for
              // a clean UX per the "practical, not flashy" tone note.
            } else if (eventType === 'tool_result') {
              try {
                var parsed = JSON.parse(data)
                renderToolResultCard(parsed.name, parsed.result)
              } catch (e) { /* ignore malformed */ }
            } else if (eventType === 'error') {
              if (typingEl.parentNode) typingEl.remove()
              try {
                var errData = JSON.parse(data)
                appendBubble('error', errData.message || 'Something went wrong.')
                if (errData.bookingUrl) {
                  appendCardHtml('<a class="gw-chat-card-link" href="' + escapeHtml(errData.bookingUrl) + '">Book a demo</a>')
                }
              } catch (e) {
                appendBubble('error', 'Something went wrong — please try again.')
              }
            } else if (eventType === 'done') {
              if (assistantText) saveHistoryEntry({ kind: 'bubble', role: 'ai', text: assistantText })
              try {
                var doneData = JSON.parse(data)
                if (assistantText && doneData && doneData.messageId) renderRating(doneData.messageId)
              } catch (e) { /* ignore malformed */ }
            }
          }
        }
      } catch (err) {
        if (typingEl.parentNode) typingEl.remove()
        appendBubble('error', "Couldn't reach Groundwork AI — check your connection and try again, or email tyler@groundwork-crm.com.")
      } finally {
        if (typingEl.parentNode) typingEl.remove()
        isStreaming = false
        setInputDisabled(false)
        input.focus()
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault()
      var text = input.value.trim()
      if (!text) return
      input.value = ''
      clearQuickReplies()
      sendMessage(text)
    })

    restoreHistory()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindChatWidget)
  } else {
    bindChatWidget()
  }
})()
