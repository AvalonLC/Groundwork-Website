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

    var STOPS = ['command', 'pipeline', 'leads', 'clients', 'properties', 'estimates', 'money', 'budget', 'invoicing', 'schedule', 'dispatch', 'workorders', 'assets', 'timetracker', 'clientportal', 'employees', 'aar']
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

    function showPanel(name) {
      root.querySelectorAll('[data-demo-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-demo-panel') !== name
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
        if (tag) {
          if (row.classList.contains('demo-handled')) {
            tag.dataset.originalText = tag.dataset.originalText || tag.textContent
            tag.textContent = row.getAttribute('data-demo-handled-label') || 'Handled'
            tag.className = 'tag tag-rapport'
          } else if (tag.dataset.originalText) {
            tag.textContent = tag.dataset.originalText
          }
        }
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
    // AI panel: Home / Suggestions / Setup / Chat tabs are illustrative —
    // clicking surfaces a toast pointing back at the Coach tab being shown.
    root.querySelectorAll('[data-demo-ai-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        showToast('This sample only walks through the Coach tab \u2014 ' + tab.getAttribute('data-demo-ai-tab') + ' is live in your real workspace.')
      })
    })

    // Topbar: notification bell badge count reflects what's still open —
    // overdue Today tasks not yet checked off, plus every "handle" row
    // not yet marked handled (Money Loop, Leads intake, Invoice
    // Reporting, AAR queue). Ticks down (with a little pulse) as you work
    // through the sample, just like the real unread counter would.
    var bellBadge = root.querySelector('[data-demo-bell-badge]')
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
    }
    updateBellBadge()

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
