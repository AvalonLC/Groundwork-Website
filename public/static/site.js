/* ============================================================
   Groundwork marketing site — client-side behaviors
   The nav/footer/icons are server-rendered (Hono JSX); this script only
   wires up the small pieces of client state the design calls for:
   mobile menu open/close, role tabs on the homepage, and anchor smooth
   scroll. FAQ accordions are native <details> — no JS needed.
   ============================================================ */
(function () {
  function bindMobileMenu() {
    document.querySelectorAll('[data-mobile-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.body.classList.toggle('mobile-menu-open')
      })
    })
    document.querySelectorAll('.mobile-menu a[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('mobile-menu-open')
      })
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.body.classList.remove('mobile-menu-open')
    })
  }

  function bindRoleTabs() {
    var tabs = document.querySelectorAll('.roles-tab')
    var panels = document.querySelectorAll('[data-role-panel]')
    if (!tabs.length) return
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var role = tab.dataset.role
        tabs.forEach(function (t) {
          t.classList.toggle('active', t === tab)
        })
        panels.forEach(function (p) {
          p.style.display = p.dataset.rolePanel === role ? 'grid' : 'none'
        })
      })
    })
  }

  function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var href = a.getAttribute('href')
      if (href.length <= 1) return
      a.addEventListener('click', function (e) {
        var el = document.querySelector(href)
        if (el) {
          e.preventDefault()
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
        }
      })
    })
  }

  function bindForms() {
    document.querySelectorAll('form[data-mock-submit]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault()
        var btn = form.querySelector('button[type="submit"]')
        if (btn) {
          btn.dataset.originalText = btn.dataset.originalText || btn.textContent
          btn.textContent = '✓ Sent'
          btn.disabled = true
        }
      })
    })
  }

  // Forms marked data-live-submit actually POST to a backend endpoint
  // (data-endpoint) as JSON, using each field's name attribute as the key.
  // On success the submit button's text is swapped to data-success-text
  // and the form is locked; on failure an inline error message is shown
  // and the form is left usable so the visitor can retry.
  function bindLiveForms() {
    document.querySelectorAll('form[data-live-submit]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault()
        var endpoint = form.dataset.endpoint
        var btn = form.querySelector('button[type="submit"]')
        var errorBox = form.querySelector('[data-form-error]')
        var originalText = btn ? btn.textContent : ''
        if (errorBox) {
          errorBox.style.display = 'none'
        }
        if (btn) {
          btn.disabled = true
          btn.textContent = 'Sending…'
        }

        var fd = new FormData(form)
        var payload = {}
        fd.forEach(function (v, k) {
          payload[k] = v
        })

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            return res
              .json()
              .catch(function () {
                return {}
              })
              .then(function (data) {
                return { res: res, data: data }
              })
          })
          .then(function (result) {
            if (result.res.ok && result.data.ok) {
              if (btn) btn.textContent = form.dataset.successText || '✓ Sent'
              form.querySelectorAll('input, select, textarea').forEach(function (el) {
                el.disabled = true
              })

              // Opt-in: forms carrying data-booking-panel (currently just the
              // /demo request form) swap themselves out for an embedded
              // booking-calendar iframe once the lead is captured, so the
              // visitor can pick a real time slot without leaving the page.
              // Every other data-live-submit form is unaffected.
              var panelId = form.dataset.bookingPanel
              if (panelId) {
                var panel = document.getElementById(panelId)
                if (panel) {
                  form.style.display = 'none'
                  var introId = form.dataset.bookingIntro
                  if (introId) {
                    var intro = document.getElementById(introId)
                    if (intro) intro.style.display = 'none'
                  }
                  panel.style.display = 'block'
                  panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }
            } else {
              throw new Error(result.data.error || 'Failed to send')
            }
          })
          .catch(function (err) {
            if (btn) {
              btn.disabled = false
              btn.textContent = originalText
            }
            if (errorBox) {
              errorBox.textContent =
                (err && err.message) ||
                'Something went wrong. Please try again or email tyler@groundwork-crm.com directly.'
              errorBox.style.display = 'block'
            }
          })
      })
    })
  }

  // Pricing calculator: pure arithmetic on the total internal-user count the
  // visitor enters, applied against each plan's flat base fee + flat
  // per-additional-user rate (read from data-* attributes on the results
  // markup — see PricingCalculator.tsx). No backend call. Every plan
  // includes a starting allotment of users in its base fee (varies per
  // plan — see data-included-users on each result card); every user beyond
  // that allotment is the same flat rate regardless of role. Customer-portal
  // / external users are never part of this count.
  function bindPricingCalculator() {
    var calc = document.querySelector('[data-pricing-calc]')
    if (!calc) return

    var usersInput = calc.querySelector('[data-calc-input="users"]')
    var results = calc.querySelectorAll('[data-calc-plan]')
    var aiSelect = calc.querySelector('[data-calc-ai-select]')

    function clampCount(v) {
      var n = parseInt(v, 10)
      if (isNaN(n) || n < 1) return 1
      if (n > 999) return 999
      return n
    }

    function recalc() {
      var totalUsers = usersInput ? clampCount(usersInput.value) : 1

      // Company-wide AI add-on: a single flat cost applied once per company,
      // never multiplied by user count.
      var aiOption = aiSelect ? aiSelect.options[aiSelect.selectedIndex] : null
      var aiPriceRaw = aiOption ? aiOption.getAttribute('data-price') : '0'
      var aiPrice = aiPriceRaw === '' || aiPriceRaw == null ? null : parseFloat(aiPriceRaw)
      var aiLineLabel = aiOption ? aiOption.getAttribute('data-line-label') : 'Included AI'

      results.forEach(function (card) {
        var basePrice = parseFloat(card.dataset.basePrice)
        var includedUsers = parseInt(card.dataset.includedUsers, 10) || 1
        var perUserPrice = parseFloat(card.dataset.perUserPrice)

        var additionalUsers = Math.max(0, totalUsers - includedUsers)
        var additionalUsersCost = additionalUsers * perUserPrice

        var baseLineEl = card.querySelector('[data-calc-base-line]')
        var usersLineEl = card.querySelector('[data-calc-users-line]')
        var aiLineEl = card.querySelector('[data-calc-ai-line]')
        var aiLineLabelEl = card.querySelector('[data-calc-ai-line-label]')
        var totalEl = card.querySelector('[data-calc-total]')
        var noteEl = card.querySelector('[data-calc-note]')

        if (baseLineEl) baseLineEl.textContent = '$' + Math.round(basePrice).toLocaleString() + '/mo'
        if (usersLineEl) {
          usersLineEl.textContent =
            additionalUsers > 0 ? '$' + Math.round(additionalUsersCost).toLocaleString() + '/mo' : '$0/mo'
        }
        if (aiLineLabelEl && aiLineLabel) aiLineLabelEl.textContent = aiLineLabel

        // Base platform fee + additional users + AI add-ons = estimated total.
        var grandTotal = basePrice + additionalUsersCost
        if (aiPrice === null) {
          // "Custom" AI package — price unknown, always shown as its own line.
          if (aiLineEl) aiLineEl.textContent = 'Contact sales'
        } else {
          grandTotal += aiPrice
          if (aiLineEl) aiLineEl.textContent = '$' + Math.round(aiPrice).toLocaleString() + '/mo'
        }

        if (totalEl) totalEl.textContent = '$' + Math.round(grandTotal).toLocaleString() + (aiPrice === null ? ' + AI' : '')

        if (noteEl) {
          if (additionalUsers === 0) {
            noteEl.textContent = includedUsers + ' user' + (includedUsers === 1 ? '' : 's') + ' included · no additional users'
          } else {
            noteEl.textContent = totalUsers + ' users total · ' + includedUsers + ' included + ' + additionalUsers + ' additional user' + (additionalUsers === 1 ? '' : 's') + ' at $' + Math.round(perUserPrice) + '/mo each'
          }
        }
      })
    }

    if (usersInput) {
      usersInput.addEventListener('input', recalc)
      usersInput.addEventListener('change', recalc)
    }

    if (aiSelect) {
      aiSelect.addEventListener('change', recalc)
    }

    calc.querySelectorAll('[data-calc-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.dataset.dir, 10)
        if (!usersInput) return
        usersInput.value = clampCount(clampCount(usersInput.value) + dir)
        recalc()
      })
    })

    recalc()
  }

  // Interactive Demo (/explore) — a full click-around sample workspace.
  // Pure client-side state (no backend, nothing persisted, resets on
  // reload). Every item in the real product's left sidebar (14 total) is
  // a real panel here — not a curated subset. Groundwork AI is a
  // slide-over triggered from the topbar (matching the real product,
  // where AI isn't a sidebar item either).
  function bindInteractiveDemo() {
    var root = document.querySelector('[data-demo-root]')
    if (!root) return

    var STOPS = ['command', 'pipeline', 'leads', 'clients', 'properties', 'estimates', 'money', 'budget', 'invoicing', 'reports', 'schedule', 'dispatch', 'workorders', 'assets', 'timetracker', 'clientportal', 'employees', 'aar', 'audit']
    var visited = { command: true }

    function updateProgress() {
      var count = STOPS.filter(function (s) { return visited[s] }).length
      var fill = root.querySelector('[data-demo-progress-fill]')
      if (fill) fill.style.width = Math.round((count / STOPS.length) * 100) + '%'
      var counter = root.querySelector('[data-demo-progress-count]')
      if (counter) counter.textContent = String(count)
    }

    // Small transient toast for illustrative-only clicks (non-Coach AI
    // tabs) — reassures the visitor nothing broke.
    var toastEl = root.querySelector('[data-demo-toast]')
    var toastTimer = null
    function showToast(msg) {
      if (!toastEl) return
      toastEl.textContent = msg
      toastEl.classList.add('show')
      if (toastTimer) clearTimeout(toastTimer)
      toastTimer = setTimeout(function () { toastEl.classList.remove('show') }, 2200)
    }

    function closeAiOverlay() {
      var overlay = root.querySelector('[data-demo-ai-overlay]')
      if (overlay) overlay.classList.remove('open')
    }

    // Brief skeleton flash on panel switch — sells the feel of a real app
    // fetching fresh data per-screen rather than instantly swapping DOM
    // nodes. Purely cosmetic timing (~260ms), cancels cleanly if the
    // visitor clicks through panels quickly (no stacked timers).
    var panelsWrap = root.querySelector('[data-demo-panels-wrap]')
    var skeletonTimer = null
    function flashSkeleton() {
      if (!panelsWrap) return
      panelsWrap.classList.add('demo-panel-loading')
      if (skeletonTimer) clearTimeout(skeletonTimer)
      skeletonTimer = setTimeout(function () {
        panelsWrap.classList.remove('demo-panel-loading')
      }, 260)
    }

    function showPanel(name) {
      var alreadyActive = root.querySelector('.pm-sidebar [data-demo-sidebar-target].active')
      var isChange = !alreadyActive || alreadyActive.getAttribute('data-demo-sidebar-target') !== name
      root.querySelectorAll('[data-demo-panel]').forEach(function (panel) {
        var isTarget = panel.getAttribute('data-demo-panel') === name
        panel.hidden = !isTarget
        // Subtle fade+rise on the panel that just became visible — a fresh
        // animation class each time (not just relying on `hidden` toggling)
        // so re-visiting the same panel still re-triggers the motion.
        if (isTarget && isChange) {
          panel.classList.remove('demo-panel-fade-in')
          void panel.offsetWidth // eslint-disable-line no-unused-expressions -- force reflow so the class re-applies
          panel.classList.add('demo-panel-fade-in')
        }
      })
      root.querySelectorAll('.pm-sidebar [data-demo-sidebar-target]').forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-demo-sidebar-target') === name)
      })
      root.querySelectorAll('.demo-quicklink').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-demo-goto') === name)
      })
      var slideover = root.querySelector('[data-demo-slideover]')
      if (slideover) slideover.classList.remove('open')
      closeAiOverlay()
      visited[name] = true
      if (isChange) flashSkeleton()
      updateProgress()
    }

    // Sidebar: every item now jumps straight to its matching panel.
    root.querySelectorAll('[data-demo-sidebar-target]').forEach(function (item) {
      item.addEventListener('click', function () {
        showPanel(item.getAttribute('data-demo-sidebar-target'))
      })
    })

    // Quick-launch chips (above the mock) + in-panel "see next" buttons —
    // both use the same data-demo-goto attribute.
    root.querySelectorAll('[data-demo-goto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showPanel(btn.getAttribute('data-demo-goto'))
        var pm = root.querySelector('.pm')
        if (pm) pm.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    // Today (Command Center): click a task to toggle done
    root.querySelectorAll('[data-demo-task]').forEach(function (task) {
      task.addEventListener('click', function () {
        task.classList.toggle('demo-task-done')
        updateBellBadge()
      })
    })

    // Pipeline: click a lead card to open the slide-over with that lead's detail
    var slideover = root.querySelector('[data-demo-slideover]')
    root.querySelectorAll('[data-demo-lead]').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-demo-lead')
        if (!slideover) return
        slideover.querySelectorAll('[data-lead-detail]').forEach(function (d) {
          d.hidden = d.getAttribute('data-lead-detail') !== id
        })
        slideover.classList.add('open')
      })
    })
    var closeBtn = root.querySelector('[data-demo-slideover-close]')
    if (closeBtn && slideover) {
      closeBtn.addEventListener('click', function () {
        slideover.classList.remove('open')
      })
    }

    // Generic "handle" rows (Money Loop, Leads intake, Invoice Reporting
    // reminders, AAR review queue) — click to mark handled/reviewed/etc.
    // The label used while handled defaults to "Handled" but can be
    // overridden per-row via data-demo-handled-label.
    root.querySelectorAll('[data-demo-handle]').forEach(function (row) {
      row.addEventListener('click', function () {
        row.classList.toggle('demo-handled')
        var tag = row.querySelector('[data-demo-handle-tag]')
        var justHandled = row.classList.contains('demo-handled')
        if (tag) {
          if (justHandled) {
            tag.dataset.originalText = tag.dataset.originalText || tag.textContent
            tag.textContent = row.getAttribute('data-demo-handled-label') || 'Handled'
            tag.className = 'tag tag-rapport'
          } else if (tag.dataset.originalText) {
            tag.textContent = tag.dataset.originalText
          }
        }
        if (justHandled) showToast('Marked ' + (row.getAttribute('data-demo-handled-label') || 'handled'))
        updateBellBadge()
      })
    })

    // Generic expandable rows (Clients, Properties, Estimates, Budget &
    // Rates, Schedule, Dispatch) — click the row to reveal a detail line
    // without leaving the panel. Clicking a handle/portal control inside
    // an expandable row must not also toggle the expand — stopPropagation
    // on those inner controls handles that.
    root.querySelectorAll('[data-demo-expand]').forEach(function (row) {
      row.addEventListener('click', function () {
        var detail = row.querySelector('.demo-row-detail')
        if (detail) detail.hidden = !detail.hidden
        row.classList.toggle('demo-row-open', detail && !detail.hidden)
      })
    })

    // Status-pill filter rows (Estimates, Assets) — click a pill to filter
    // the nearest table/list by its data-demo-status; "All" (no filter
    // attr) clears it. Cosmetic-but-functional, same spirit as the search
    // filter: client-side substring/attr match, nothing persisted.
    root.querySelectorAll('.demo-pill-row').forEach(function (rowGroup) {
      var pills = rowGroup.querySelectorAll('[data-demo-pill]')
      var scope = rowGroup.closest('div[data-demo-panel]') || root
      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          pills.forEach(function (p) { p.classList.remove('active') })
          pill.classList.add('active')
          var filter = pill.getAttribute('data-demo-pill-filter')
          scope.querySelectorAll('[data-demo-status]').forEach(function (row) {
            var show = !filter || filter === 'all' || row.getAttribute('data-demo-status') === filter
            row.classList.toggle('demo-search-hide', !show)
          })
        })
      })
    })

    // Real <table> rows with an expandable detail row directly beneath
    // them (Estimates, Assets, Employees & Teams) — click a data row to
    // reveal/hide its paired .demo-table-detail-row sibling.
    root.querySelectorAll('[data-demo-table-row]').forEach(function (row) {
      row.addEventListener('click', function () {
        var detail = row.nextElementSibling
        if (detail && detail.classList.contains('demo-table-detail-row')) {
          detail.classList.toggle('hidden-row')
          row.classList.toggle('demo-row-open', !detail.classList.contains('hidden-row'))
        }
      })
    })

    // Time Tracker: a real running clock-in timer. Click to start/stop;
    // while running, the elapsed time ticks up once a second. Purely
    // client-side and resets to the starting value on reload.
    root.querySelectorAll('[data-demo-clock-btn]').forEach(function (btn) {
      var card = btn.closest('.demo-clock-card')
      if (!card) return
      var display = card.querySelector('[data-demo-clock-time]')
      var sub = card.querySelector('[data-demo-clock-sub]')
      var startBase = 4 * 3600 + 12 * 60 + 8 // resumes an in-progress 4h12m08s shift
      var seconds = startBase
      var timer = null
      function fmt(total) {
        var h = Math.floor(total / 3600)
        var m = Math.floor((total % 3600) / 60)
        var s = total % 60
        return [h, m, s].map(function (n) { return String(n).padStart(2, '0') }).join(':')
      }
      function render() {
        if (display) display.textContent = fmt(seconds)
      }
      function startTicking() {
        if (timer) return
        timer = setInterval(function () {
          seconds++
          render()
        }, 1000)
      }
      // Sample workspace loads mid-shift, already clocked in — matches the
      // real product's live running timer rather than a static zero state.
      var running = true
      render()
      startTicking()
      btn.addEventListener('click', function () {
        running = !running
        if (running) {
          btn.textContent = 'Clock Out'
          btn.classList.add('running')
          if (sub) sub.textContent = 'Clocked in \u00b7 Pool Coping \u00b7 N. Knesley'
          startTicking()
        } else {
          btn.textContent = 'Clock In'
          btn.classList.remove('running')
          if (sub) sub.textContent = 'Clocked out \u00b7 shift saved to today\u2019s timesheet'
          if (timer) { clearInterval(timer); timer = null }
        }
      })
    })

    // Client Portal: Disable/Enable toggle per user — flips the status tag
    // and button label. Independent little widget, not a data-demo-handle
    // (there's no "unhandle" concept here, just a live status flip).
    root.querySelectorAll('[data-demo-portal-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation()
        var user = btn.closest('[data-demo-portal-status]')
        if (!user) return
        var tag = user.querySelector('[data-demo-portal-tag]')
        var last = user.querySelector('[data-demo-portal-last]')
        var isDisabled = user.getAttribute('data-demo-portal-status') === 'Disabled'
        if (isDisabled) {
          user.setAttribute('data-demo-portal-status', 'Active')
          if (tag) { tag.textContent = 'Active'; tag.className = 'tag tag-rapport' }
          if (last) last.textContent = 'Re-enabled by Tyler just now'
          btn.textContent = 'Disable'
        } else {
          user.setAttribute('data-demo-portal-status', 'Disabled')
          if (tag) { tag.textContent = 'Disabled'; tag.className = 'tag tag-red' }
          if (last) last.textContent = 'Revoked by Tyler just now'
          btn.textContent = 'Enable'
        }
      })
    })

    // Groundwork AI overlay — triggered from the topbar button (AI isn't a
    // sidebar item in the real product; it's available from anywhere).
    var aiOverlay = root.querySelector('[data-demo-ai-overlay]')
    var aiTrigger = root.querySelector('[data-demo-ai-trigger]')
    if (aiTrigger && aiOverlay) {
      aiTrigger.addEventListener('click', function () {
        if (slideover) slideover.classList.remove('open')
        aiOverlay.classList.toggle('open')
      })
    }
    var aiOverlayClose = root.querySelector('[data-demo-ai-overlay-close]')
    if (aiOverlayClose && aiOverlay) {
      aiOverlayClose.addEventListener('click', function () {
        aiOverlay.classList.remove('open')
      })
    }

    // Groundwork AI: click a coach card — a brief "thinking" beat, then
    // reveal the suggested action (fake latency sells the "AI reasoning"
    // moment; it's still instant enough not to feel like a real delay).
    root.querySelectorAll('[data-demo-ai-card]').forEach(function (card) {
      card.addEventListener('click', function () {
        var detail = card.querySelector('[data-demo-ai-detail]')
        var thinking = card.querySelector('[data-demo-ai-thinking]')
        if (!detail) return
        if (!detail.hidden) {
          detail.hidden = true
          return
        }
        if (thinking && detail.hidden) {
          thinking.hidden = false
          setTimeout(function () {
            thinking.hidden = true
            detail.hidden = false
          }, 550)
        } else {
          detail.hidden = false
        }
      })
    })
    // AI panel: Home / Suggestions / Setup tabs are illustrative — clicking
    // surfaces a toast pointing back at the Coach/Chat tabs, which are real.
    root.querySelectorAll('[data-demo-ai-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        showToast('This sample only walks through Coach & Chat \u2014 ' + tab.getAttribute('data-demo-ai-tab') + ' is live in your real workspace.')
      })
    })

    // AI panel: Coach / Chat are both real, switchable sub-panels — click
    // a tab to swap which one is visible and update the active tab style.
    root.querySelectorAll('[data-demo-ai-panel-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-demo-ai-panel-tab')
        root.querySelectorAll('[data-demo-ai-panel-tab]').forEach(function (t) {
          var active = t === tab
          t.style.background = active ? 'rgba(255,255,255,0.08)' : ''
          t.style.color = active ? 'white' : '#7A9788'
          t.style.fontWeight = active ? '600' : ''
        })
        if (aiOverlay) {
          aiOverlay.querySelectorAll('[data-demo-ai-panel]').forEach(function (panel) {
            panel.hidden = panel.getAttribute('data-demo-ai-panel') !== target
          })
        }
      })
    })

    // AI Chat tab: a small canned Q&A — clicking a suggestion chip (or
    // typing a question that matches one and hitting Ask/Enter) appends a
    // user bubble then, after a short "thinking" beat, an AI reply bubble
    // grounded in this sample workspace's own data. Anything that doesn't
    // match a known question gets a graceful catch-all reply rather than
    // silently doing nothing.
    ;(function bindAiChat() {
      var log = root.querySelector('[data-demo-ai-chat-log]')
      var input = root.querySelector('[data-demo-ai-chat-input]')
      var sendBtn = root.querySelector('[data-demo-ai-chat-send]')
      if (!log || !input || !sendBtn) return

      var answers = [
        { match: /at risk|risk|going quiet|quiet/i, reply: 'Two deals are flagged: Nicole Knesley\u2019s Pool Coping ($58,200, no contact 7 days) and Sydney Lampard\u2019s Deck Lighting ($18,000, missed follow-up). Both are on the Coach tab with a suggested next step.' },
        { match: /outstanding|owe|unpaid|invoice/i, reply: 'Right now: R. Aleman\u2019s full landscape job is complete but not yet invoiced, and D. Patel\u2019s hardscape invoice has been unpaid for 12 days. Both are sitting in the Money Loop.' },
        { match: /hitting|month|goal|target|quota/i, reply: 'Pipeline value is $202k with a weighted value of $96k and a 58% win rate over the last 90 days \u2014 tracking ahead of last month\u2019s close rate. See the Reports & Analytics panel for the full trend.' },
        { match: /behind on hours|hours|overtime|timesheet/i, reply: 'Jasmine Alvarez logged 42.0 hrs this week (2.0 hrs overtime) after a recurring maintenance route ran long. There\u2019s also a pending timesheet correction for her waiting on approval in Employees & Teams.' },
      ]
      var fallback = 'I don\u2019t have a canned answer for that in this sample \u2014 in your real workspace, Groundwork AI reasons over your live pipeline, invoices, and crew data to answer questions like this directly.'

      function addBubble(text, who) {
        var bubble = document.createElement('div')
        bubble.className = 'demo-ai-chat-bubble ' + who
        bubble.textContent = text
        log.appendChild(bubble)
        log.scrollTop = log.scrollHeight
      }

      function ask(question) {
        var q = (question || '').trim()
        if (!q) return
        addBubble(q, 'user')
        input.value = ''
        var thinking = document.createElement('div')
        thinking.className = 'demo-ai-chat-bubble ai'
        thinking.innerHTML = '<span class="demo-ai-dot"></span><span class="demo-ai-dot"></span><span class="demo-ai-dot"></span>'
        log.appendChild(thinking)
        log.scrollTop = log.scrollHeight
        setTimeout(function () {
          thinking.remove()
          var hit = answers.filter(function (a) { return a.match.test(q) })[0]
          addBubble(hit ? hit.reply : fallback, 'ai')
        }, 650)
      }

      root.querySelectorAll('[data-demo-ai-chat-q]').forEach(function (chip) {
        chip.addEventListener('click', function () {
          ask(chip.getAttribute('data-demo-ai-chat-q'))
        })
      })
      sendBtn.addEventListener('click', function () { ask(input.value) })
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); ask(input.value) }
      })
    })()

    // Topbar: notification bell badge count reflects what's still open —
    // overdue Today tasks not yet checked off, plus every "handle" row
    // not yet marked handled (Money Loop, Leads intake, Invoice
    // Reporting, AAR queue). Ticks down (with a little pulse) as you work
    // through the sample, just like the real unread counter would.
    var bellBadge = root.querySelector('[data-demo-bell-badge]')
    var bellDropdownList = root.querySelector('[data-demo-bell-dropdown-list]')
    // Real notification items behind the badge count — same underlying
    // open-overdue/open-handle rows the count is built from, so the two
    // never disagree. Each item's own row is re-read live off the DOM
    // (title text, task/handle label) rather than a separate hardcoded
    // list, so checking a task off also removes its notification.
    function buildBellItems() {
      var items = []
      root.querySelectorAll('[data-demo-task].overdue:not(.demo-task-done)').forEach(function (task) {
        var titleEl = task.querySelector('.tk-title')
        items.push({ title: titleEl ? titleEl.textContent : 'Overdue task', sub: 'Overdue \u00b7 Command Center', el: task })
      })
      root.querySelectorAll('[data-demo-handle]:not(.demo-handled)').forEach(function (row) {
        // Handle rows are consistently a bold name/title div followed by a
        // .demo-row-sub detail div — read them as two separate strings
        // (rather than the row's combined textContent) so the dropdown
        // doesn't run them together with no separator.
        var titleEl = row.querySelector(':scope > div:first-child > div:first-child')
        var subEl = row.querySelector('.demo-row-sub')
        items.push({
          title: titleEl ? titleEl.textContent.trim() : 'Needs attention',
          sub: subEl ? subEl.textContent.trim() : 'Open item',
          el: row,
        })
      })
      return items
    }
    function renderBellDropdown() {
      if (!bellDropdownList) return
      var items = buildBellItems()
      if (!items.length) {
        bellDropdownList.innerHTML = '<div class="demo-bell-dropdown-empty">You\u2019re all caught up.</div>'
        return
      }
      bellDropdownList.innerHTML = ''
      items.slice(0, 8).forEach(function (item) {
        var btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'demo-bell-dropdown-item'
        btn.innerHTML = '<strong></strong><span></span>'
        btn.querySelector('strong').textContent = item.title
        btn.querySelector('span').textContent = item.sub
        btn.addEventListener('click', function () {
          if (item.el && item.el.scrollIntoView) item.el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          closeBellDropdown()
        })
        bellDropdownList.appendChild(btn)
      })
    }
    function updateBellBadge() {
      if (!bellBadge) return
      var openOverdue = root.querySelectorAll('[data-demo-task].overdue:not(.demo-task-done)').length
      var openHandle = root.querySelectorAll('[data-demo-handle]:not(.demo-handled)').length
      var count = openOverdue + openHandle
      var prev = bellBadge.textContent
      bellBadge.textContent = String(count)
      bellBadge.setAttribute('data-demo-bell-badge', count === 0 ? '' : String(count))
      if (String(count) !== prev) {
        bellBadge.classList.add('demo-bell-pulse')
        setTimeout(function () { bellBadge.classList.remove('demo-bell-pulse') }, 200)
      }
      renderBellDropdown()
    }
    updateBellBadge()

    // Notification bell: click to toggle the dropdown; click anywhere
    // outside (or Escape) to close it. Opening the bell closes the AI
    // overlay/palette so only one floating panel is ever open at once.
    var bellTrigger = root.querySelector('[data-demo-bell]')
    var bellDropdown = root.querySelector('[data-demo-bell-dropdown]')
    function closeBellDropdown() {
      if (bellDropdown) bellDropdown.classList.remove('open')
    }
    if (bellTrigger && bellDropdown) {
      bellTrigger.addEventListener('click', function (e) {
        e.stopPropagation()
        var opening = !bellDropdown.classList.contains('open')
        closeBellDropdown()
        if (opening) {
          renderBellDropdown()
          bellDropdown.classList.add('open')
        }
      })
      document.addEventListener('click', function (e) {
        if (!bellDropdown.contains(e.target) && e.target !== bellTrigger && !bellTrigger.contains(e.target)) {
          closeBellDropdown()
        }
      })
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeBellDropdown()
      })
    }

    // Pending Approvals (Employees & Teams) — Approve/Deny resolves the
    // row with a fade-and-collapse, decrements its stat card, and shows a
    // confirmation toast. Independent of the generic handle-row pattern
    // since these rows disappear entirely rather than flipping a tag.
    root.querySelectorAll('[data-demo-approval-action]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation()
        var row = btn.closest('[data-demo-approval-row]')
        if (!row || row.classList.contains('demo-approval-resolved')) return
        var action = btn.getAttribute('data-demo-approval-action')
        var titleEl = row.querySelector('div > div')
        var label = titleEl ? titleEl.textContent.split('\u00b7')[0].trim() : 'Request'
        row.classList.add('demo-approval-resolved')
        showToast((action === 'approve' ? 'Approved: ' : 'Denied: ') + label)
        setTimeout(function () { row.remove() }, 260)
      })
    })

    // Toast feedback on already-existing actions that changed state
    // silently before — Clock In/Out and pill/status filter switches now
    // get a small confirmation too, matching Approve/Deny and bulk actions.
    root.querySelectorAll('[data-demo-clock-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(function () {
          showToast(btn.classList.contains('running') ? 'Clocked in \u2014 timer running' : 'Clocked out \u2014 shift saved to today\u2019s timesheet')
        }, 0)
      })
    })

    // Bulk-select: checkbox column + floating action bar, scoped per
    // table via data-demo-bulk-scope (Estimates, Assets, Employees).
    // Select-all/row checkboxes toggle a "selected" state, drive the
    // bulkbar's visibility + count, and each bulk action button just
    // shows a toast (nothing to actually send in a client-only sample).
    // Checkbox cells carry data-demo-nostop so clicking them doesn't also
    // toggle the row's own expand/detail behavior.
    root.querySelectorAll('[data-demo-nostop]').forEach(function (cell) {
      cell.addEventListener('click', function (e) { e.stopPropagation() })
    })
    root.querySelectorAll('[data-demo-bulk-scope]').forEach(function (table) {
      var scope = table.getAttribute('data-demo-bulk-scope')
      var selectAll = table.querySelector('[data-demo-bulk-selectall="' + scope + '"]')
      var bulkbar = root.querySelector('[data-demo-bulkbar="' + scope + '"]')
      var countEl = bulkbar ? bulkbar.querySelector('[data-demo-bulkbar-count]') : null
      function rowChecks() { return table.querySelectorAll('[data-demo-row-check]') }
      function updateBar() {
        var checks = rowChecks()
        var checked = Array.prototype.filter.call(checks, function (c) { return c.checked })
        if (bulkbar) bulkbar.classList.toggle('open', checked.length > 0)
        if (countEl) countEl.textContent = checked.length + ' selected'
        if (selectAll) {
          selectAll.checked = checked.length > 0 && checked.length === checks.length
          selectAll.indeterminate = checked.length > 0 && checked.length < checks.length
        }
      }
      rowChecks().forEach(function (cb) {
        cb.addEventListener('click', function (e) { e.stopPropagation() })
        cb.addEventListener('change', updateBar)
      })
      if (selectAll) {
        selectAll.addEventListener('click', function (e) { e.stopPropagation() })
        selectAll.addEventListener('change', function () {
          rowChecks().forEach(function (cb) { cb.checked = selectAll.checked })
          updateBar()
        })
      }
      if (bulkbar) {
        bulkbar.querySelectorAll('[data-demo-bulk-action]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var checked = Array.prototype.filter.call(rowChecks(), function (c) { return c.checked }).length
            showToast(btn.getAttribute('data-demo-bulk-action') + ': ' + checked + ' selected')
          })
        })
        var clearBtn = bulkbar.querySelector('[data-demo-bulk-clear]')
        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            rowChecks().forEach(function (cb) { cb.checked = false })
            if (selectAll) { selectAll.checked = false; selectAll.indeterminate = false }
            updateBar()
          })
        }
      }
    })

    // Pipeline: drag-and-drop kanban cards between stages. Grabbing a
    // card marks it .dragging (dims it); dragging over a column highlights
    // the drop target; dropping moves the real DOM node into the new
    // column, updates both columns' header counts, swaps the empty-state
    // placeholder in/out as needed, and confirms with a toast.
    ;(function bindKanbanDnD() {
      var cols = root.querySelectorAll('[data-demo-kanban-col]')
      if (!cols.length) return
      var draggedCard = null

      function colCount(col) {
        return col.querySelectorAll('.demo-lead-card').length
      }
      function colLabel(col) {
        var h = col.querySelector('[data-demo-kanban-h]')
        if (!h) return col.getAttribute('data-demo-kanban-col')
        return h.textContent.split('\u00b7')[0].trim()
      }
      function refreshColumn(col) {
        var count = colCount(col)
        var countEl = col.querySelector('[data-demo-kanban-count]')
        if (countEl) countEl.textContent = String(count)
        var empty = col.querySelector('.demo-kanban-empty')
        if (count === 0 && !empty) {
          var placeholder = document.createElement('div')
          placeholder.className = 'demo-jobpool-item demo-kanban-empty'
          placeholder.style.cursor = 'default'
          placeholder.style.opacity = '0.5'
          placeholder.style.textAlign = 'center'
          placeholder.style.fontSize = '10.5px'
          placeholder.style.color = 'var(--gw-ink-400)'
          placeholder.style.padding = '16px 8px'
          placeholder.textContent = 'No deals in this stage'
          col.appendChild(placeholder)
        } else if (count > 0 && empty) {
          empty.remove()
        }
      }

      root.querySelectorAll('.demo-lead-card[draggable="true"]').forEach(function (card) {
        card.addEventListener('dragstart', function (e) {
          draggedCard = card
          card.classList.add('dragging')
          if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move'
            try { e.dataTransfer.setData('text/plain', card.getAttribute('data-demo-lead') || '') } catch (err) { /* no-op */ }
          }
        })
        card.addEventListener('dragend', function () {
          card.classList.remove('dragging')
          draggedCard = null
        })
      })

      cols.forEach(function (col) {
        col.addEventListener('dragover', function (e) {
          if (!draggedCard) return
          e.preventDefault()
          col.classList.add('drag-over')
        })
        col.addEventListener('dragleave', function () {
          col.classList.remove('drag-over')
        })
        col.addEventListener('drop', function (e) {
          e.preventDefault()
          col.classList.remove('drag-over')
          if (!draggedCard) return
          var fromCol = draggedCard.closest('[data-demo-kanban-col]')
          if (fromCol === col) return
          var emptyState = col.querySelector('.demo-kanban-empty')
          if (emptyState) col.insertBefore(draggedCard, emptyState)
          else col.appendChild(draggedCard)
          if (fromCol) refreshColumn(fromCol)
          refreshColumn(col)
          showToast((draggedCard.querySelector('div') ? draggedCard.querySelector('div').textContent : 'Deal') + ' moved to ' + colLabel(col))
        })
      })
    })()

    // Command palette (Cmd/Ctrl+K) — jump to any sidebar panel or a named
    // client/record. Opens from the topbar trigger or the Ctrl/Cmd+K
    // shortcut from anywhere on the page; type to filter, arrow keys move
    // the active row, Enter navigates (and opens the matching lead card's
    // slide-over when the record carries one), Escape or an outside click
    // closes it without navigating.
    ;(function bindCommandPalette() {
      var overlay = root.querySelector('[data-demo-cmdk-overlay]')
      var trigger = root.querySelector('[data-demo-cmdk-trigger]')
      var input = root.querySelector('[data-demo-cmdk-input]')
      var list = root.querySelector('[data-demo-cmdk-list]')
      var empty = root.querySelector('[data-demo-cmdk-empty]')
      if (!overlay || !input || !list) return
      var items = Array.prototype.slice.call(root.querySelectorAll('[data-demo-cmdk-item]'))

      function setActive(el) {
        items.forEach(function (i) { i.classList.remove('active') })
        if (el) {
          el.classList.add('active')
          el.scrollIntoView({ block: 'nearest' })
        }
      }
      function visibleItems() {
        return items.filter(function (i) { return i.style.display !== 'none' })
      }
      function openPalette() {
        overlay.classList.add('open')
        closeAiOverlay()
        closeBellDropdown()
        input.value = ''
        items.forEach(function (i) { i.style.display = '' })
        root.querySelectorAll('[data-demo-cmdk-group]').forEach(function (g) { g.style.display = '' })
        if (empty) empty.hidden = true
        setActive(visibleItems()[0])
        setTimeout(function () { input.focus() }, 10)
      }
      function closePalette() {
        overlay.classList.remove('open')
      }
      function filterPalette() {
        var term = input.value.trim().toLowerCase()
        var anyVisible = false
        items.forEach(function (i) {
          var match = !term || (i.getAttribute('data-demo-cmdk-text') || '').indexOf(term) !== -1
          i.style.display = match ? '' : 'none'
          if (match) anyVisible = true
        })
        root.querySelectorAll('[data-demo-cmdk-group]').forEach(function (g) {
          var hasVisible = Array.prototype.some.call(g.querySelectorAll('[data-demo-cmdk-item]'), function (i) { return i.style.display !== 'none' })
          g.style.display = hasVisible ? '' : 'none'
        })
        if (empty) empty.hidden = anyVisible
        setActive(visibleItems()[0])
      }
      function activate(item) {
        if (!item) return
        var goto = item.getAttribute('data-demo-cmdk-goto')
        var lead = item.getAttribute('data-demo-cmdk-lead')
        closePalette()
        if (goto) {
          showPanel(goto)
          var pm = root.querySelector('.pm')
          if (pm) pm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        if (lead && slideover) {
          setTimeout(function () {
            slideover.querySelectorAll('[data-lead-detail]').forEach(function (d) {
              d.hidden = d.getAttribute('data-lead-detail') !== lead
            })
            slideover.classList.add('open')
          }, 260)
        }
      }

      if (trigger) trigger.addEventListener('click', openPalette)
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          overlay.classList.contains('open') ? closePalette() : openPalette()
        } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
          closePalette()
        }
      })
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePalette()
      })
      input.addEventListener('input', filterPalette)
      input.addEventListener('keydown', function (e) {
        var visible = visibleItems()
        var idx = visible.indexOf(list.querySelector('.demo-cmdk-item.active'))
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setActive(visible[Math.min(visible.length - 1, idx + 1)] || visible[0])
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setActive(visible[Math.max(0, idx - 1)] || visible[0])
        } else if (e.key === 'Enter') {
          e.preventDefault()
          activate(list.querySelector('.demo-cmdk-item.active') || visible[0])
        }
      })
      items.forEach(function (item) {
        item.addEventListener('click', function () { activate(item) })
        item.addEventListener('mouseenter', function () { setActive(item) })
      })
    })()

    // Topbar: live search filters tasks, pipeline lead cards, and every
    // other data-demo-searchable row across whichever panel is visible
    // (client-side only — filtering doesn't change which panel is active).
    var searchInput = root.querySelector('[data-demo-search]')
    var searchEmpty = root.querySelector('[data-demo-search-empty]')
    var searchEmptyTerm = root.querySelector('[data-demo-search-empty-term]')
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var term = searchInput.value.trim().toLowerCase()
        var items = root.querySelectorAll('[data-demo-searchable]')
        var visibleCount = 0
        items.forEach(function (el) {
          var match = !term || el.getAttribute('data-demo-searchable').indexOf(term) !== -1
          el.classList.toggle('demo-search-hide', !match)
          if (match) visibleCount++
        })
        if (searchEmpty) {
          searchEmpty.hidden = !(term && visibleCount === 0)
          if (searchEmptyTerm) searchEmptyTerm.textContent = searchInput.value.trim()
        }
      })
    }

    // Deep-link support: marketing pages link into a specific sidebar
    // panel via ?panel=<key>, e.g. /explore?panel=dispatch. Falls back
    // silently to the default Command Center panel for an unknown/absent
    // key, so a bad or missing query string never breaks the page.
    var requestedPanel = null
    try {
      requestedPanel = new URLSearchParams(window.location.search).get('panel')
    } catch (e) { /* no-op — very old browsers without URLSearchParams */ }
    if (requestedPanel && STOPS.indexOf(requestedPanel) !== -1) {
      showPanel(requestedPanel)
      var targetPm = root.querySelector('.pm')
      if (targetPm) targetPm.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    updateProgress()
  }

  function init() {
    bindMobileMenu()
    bindRoleTabs()
    bindSmoothScroll()
    bindForms()
    bindLiveForms()
    bindPricingCalculator()
    bindInteractiveDemo()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
