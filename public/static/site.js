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

  // Pricing calculator: pure arithmetic on the counts the visitor enters,
  // multiplied against each plan's seat rates (read from data-* attributes
  // on the results markup — see PricingCalculator.tsx). No backend call;
  // this is just presenting the same numbers already printed on the seat
  // table in a way that's easier to reason about with a real team size.
  function bindPricingCalculator() {
    var calc = document.querySelector('[data-pricing-calc]')
    if (!calc) return

    var viewPrice = parseFloat(calc.dataset.viewPrice) || 10

    var inputs = {
      rep: calc.querySelector('[data-calc-input="rep"]'),
      field: calc.querySelector('[data-calc-input="field"]'),
      office: calc.querySelector('[data-calc-input="office"]'),
      view: calc.querySelector('[data-calc-input="view"]'),
    }
    var results = calc.querySelectorAll('[data-calc-plan]')

    function clampCount(v) {
      var n = parseInt(v, 10)
      if (isNaN(n) || n < 0) return 0
      if (n > 999) return 999
      return n
    }

    // Field-seat volume breaks: seats 1-5 at full rate, seats 6-10 at -10%,
    // seats 11+ at -15% — graduated like a tax bracket, so adding a seat
    // never makes the total go down. Mirrors the copy on the calculator and
    // the plan seat tables.
    function fieldCost(qty, rate) {
      if (qty <= 0) return 0
      var tier1 = Math.min(qty, 5)
      var tier2 = Math.max(0, Math.min(qty, 10) - 5)
      var tier3 = Math.max(0, qty - 10)
      return tier1 * rate + tier2 * rate * 0.9 + tier3 * rate * 0.85
    }

    // View-only seats: first `included` per plan are free, everything past
    // that bills at the flat view-only rate.
    function viewCost(qty, included) {
      var billable = Math.max(0, qty - included)
      return billable * viewPrice
    }

    function recalc() {
      var rep = clampCount(inputs.rep.value)
      var field = clampCount(inputs.field.value)
      var office = clampCount(inputs.office.value)
      var view = inputs.view ? clampCount(inputs.view.value) : 0
      var totalSeats = rep + field + office + view

      var soloHint = calc.querySelector('[data-calc-solo-hint]')
      if (soloHint) {
        soloHint.style.display = totalSeats === 0 ? 'block' : 'none'
      }

      results.forEach(function (card) {
        var repPrice = parseFloat(card.dataset.repPrice)
        var fieldPrice = parseFloat(card.dataset.fieldPrice)
        var officePrice = parseFloat(card.dataset.officePrice)
        var viewIncluded = parseInt(card.dataset.viewIncluded, 10) || 0
        var minSeats = parseInt(card.dataset.minSeats, 10) || 0

        var total = rep * repPrice + fieldCost(field, fieldPrice) + office * officePrice + viewCost(view, viewIncluded)
        var totalEl = card.querySelector('[data-calc-total]')
        var noteEl = card.querySelector('[data-calc-note]')

        if (totalEl) totalEl.textContent = '$' + Math.round(total).toLocaleString()

        if (noteEl) {
          if (totalSeats === 0) {
            noteEl.textContent = 'Add your team above to see a total'
          } else if (rep + field + office < minSeats) {
            noteEl.textContent = minSeats + ' seat minimum on this plan'
          } else {
            var note = totalSeats + ' seat' + (totalSeats === 1 ? '' : 's') + ' total'
            if (field > 5) note += ' · field volume discount applied'
            if (view > 0 && view <= viewIncluded) note += ' · view-only free'
            noteEl.textContent = note
          }
        }
      })
    }

    Object.keys(inputs).forEach(function (key) {
      var input = inputs[key]
      if (!input) return
      input.addEventListener('input', recalc)
      input.addEventListener('change', recalc)
    })

    calc.querySelectorAll('[data-calc-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.calcStep
        var dir = parseInt(btn.dataset.dir, 10)
        var input = inputs[key]
        if (!input) return
        input.value = clampCount(clampCount(input.value) + dir)
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
