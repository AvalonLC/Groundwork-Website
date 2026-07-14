import { NAV, isSection } from '../data/nav'

// <SiteNav /> — recreation of chrome.js renderNav() + renderMobileMenu().
// Desktop dropdowns use pure CSS :hover / :focus-within (see styles.css),
// so no client JS is required for the dropdown behavior itself. The
// hamburger toggle and active-nav-item highlighting are wired via a small
// inline script in Layout.tsx (site.js), matching the design's stated
// client state model (mobile menu open / active tab / FAQ open).
export function SiteNav({ path }: { path: string }) {
  return (
    <>
      <nav class="nav" data-screen-label="Nav">
        <div class="nav-inner">
          <a href="/" class="brand">
            <span class="brand-mark"></span>
            Groundwork
          </a>
          <div class="nav-links">
            {NAV.map((item) => {
              const isActive =
                path === item.href ||
                (item.menu?.some((m) => !isSection(m) && m.href === path) ?? false)
              return (
                <div class={`nav-item${item.menu ? ' has-dropdown' : ''}`}>
                  <a
                    href={item.href}
                    class={`${item.menu ? 'has-menu' : ''}${isActive ? ' nav-active' : ''}`.trim()}
                  >
                    {item.label}
                  </a>
                  {item.menu && (
                    <div class="dropdown-panel">
                      <div class="dropdown-grid">
                        {item.menu.map((m) =>
                          isSection(m) ? (
                            <div class="dropdown-section">{m.section}</div>
                          ) : (
                            <a class="dropdown-link" href={m.href}>
                              <div class="dl-label">{m.label}</div>
                              {m.desc && <div class="dl-desc">{m.desc}</div>}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div class="nav-cta">
            <a href="/login" class="signin">
              Log in <span class="host">groundwork-crm.com</span>
            </a>
            <a href="/demo" class="btn btn-primary">
              Book a demo <span class="arrow">→</span>
            </a>
            <button class="mobile-menu-toggle" aria-label="Open menu" data-mobile-toggle>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu />
    </>
  )
}

function MobileMenu() {
  return (
    <div class="mobile-menu" role="dialog" aria-label="Site navigation">
      <div class="mobile-menu-head">
        <a href="/" class="brand">
          <span class="brand-mark"></span> Groundwork
        </a>
        <button class="mobile-menu-toggle" aria-label="Close menu" data-mobile-toggle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>
      {NAV.map((item) =>
        !item.menu ? (
          <div class="mobile-menu-section">
            <a href={item.href}>
              <div>
                <div>{item.label}</div>
              </div>
            </a>
          </div>
        ) : (
          <div class="mobile-menu-section">
            <div class="mm-label">{item.label}</div>
            {item.menu
              .filter((m) => !isSection(m))
              .map((m) =>
                !isSection(m) ? (
                  <a href={m.href}>
                    <div>
                      <div>{m.label}</div>
                      {m.desc && <div class="mm-desc">{m.desc}</div>}
                    </div>
                  </a>
                ) : null
              )}
          </div>
        )
      )}
      <div class="mobile-menu-footer">
        <a href="/demo" class="btn btn-primary">
          Book a demo <span class="arrow">→</span>
        </a>
        <a href="/login" class="btn btn-secondary">
          Log in
        </a>
      </div>
    </div>
  )
}
