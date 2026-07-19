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
  // includes 1 user in its base fee; every additional internal user is the
  // same flat rate regardless of role. Customer-portal / external users are
  // never part of this count.
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
            noteEl.textContent = '1 user included · no additional users'
          } else {
            noteEl.textContent = totalUsers + ' users total · ' + additionalUsers + ' additional user' + (additionalUsers === 1 ? '' : 's') + ' at $' + Math.round(perUserPrice) + '/mo each'
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

  function init() {
    bindMobileMenu()
    bindRoleTabs()
    bindSmoothScroll()
    bindForms()
    bindLiveForms()
    bindPricingCalculator()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
