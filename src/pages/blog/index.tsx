import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { BLOG_POSTS } from '../../data/blog'

export function BlogIndexPage() {
  return (
    <Layout
      title="Blog — Groundwork CRM"
      description="Field notes for service business operators — sales, operations, estimating, and the systems that run a company without you having to carry it all in your head."
      path="/blog"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Blog</span>
          <h1 style="margin-top: 20px;">
            Field notes for&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">operators.</em>
          </h1>
          <p class="lede">
            Writing about running service businesses well — process, people, systems, and the software that
            supports the work. Written by the team that built Groundwork, most of whom ran crews before they
            wrote a line of it.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            {BLOG_POSTS.map((p) => (
              <a href={`/blog/${p.slug}`} class="blog-index-card">
                <div class="meta">
                  <span>{p.tag}</span>
                  <span class="dot"></span>
                  <span class="time">{p.readTime}</span>
                </div>
                <div class="title">{p.title}</div>
                <div class="desc">{p.desc}</div>
                <div class="readmore">Read the post →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Prefer to see the software in&nbsp;action?</>}
        description="A specialist will show you how Groundwork solves the problems this writing is talking about."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
