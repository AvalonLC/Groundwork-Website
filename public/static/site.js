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

  function init() {
    bindMobileMenu()
    bindRoleTabs()
    bindSmoothScroll()
    bindForms()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
