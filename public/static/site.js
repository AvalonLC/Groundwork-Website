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

  function init() {
    bindMobileMenu()
    bindRoleTabs()
    bindSmoothScroll()
    bindForms()
    bindLiveForms()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
