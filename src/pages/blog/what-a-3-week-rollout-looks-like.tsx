import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function WhatA3WeekRolloutLooksLikePost() {
  const post = getPostBySlug('what-a-3-week-rollout-looks-like')!
  const related = getRelatedPosts(post.slug)

  return (
    <Layout
      title={`${post.title} — Groundwork CRM`}
      description={post.desc}
      path={`/blog/${post.slug}`}
      structuredData={[{
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.desc,
        author: { '@type': 'Person', name: post.authorName },
        datePublished: post.date,
      }]}
    >
      <ArticleHero
        tag={post.tag}
        date={post.date}
        readTime={post.readTime}
        title={post.title}
        lede={post.desc}
      />

      <ArticleBody>
        <p>
          The single biggest reason service business owners put off switching CRMs isn't the price and it
          isn't even the learning curve — it's the fear of a dead month. Spreadsheets and sticky notes are
          ugly, but they work today. A rollout that eats four to six weeks of productivity to fix "ugly but
          working" is a hard sell, and honestly, it should be.
        </p>
        <p>
          A rollout doesn't have to look like that. Here's what a 2–3 week implementation actually looks like,
          week by week — not a sales pitch, a real operational breakdown of what happens and who's involved.
        </p>

        <h2>Week 1 — Scope: discovery and the migration plan</h2>
        <p>
          This week is entirely about mapping, not building. An implementation lead sits down with the owner
          and office manager and documents: current tools in use (spreadsheets, a legacy CRM, a scheduling
          app, a shared inbox — usually some combination), existing pipeline stages (even informal ones — "a
          lead goes from inquiry to quoted to scheduled" counts), service lines, roles, and the state of
          existing client and property data.
        </p>
        <p>
          The deliverable at the end of week 1 is a written setup plan the owner signs off on before anything
          gets built — pipeline stages, roles and permissions, which data migrates and from where. No
          surprises mid-build, because nothing gets built until this is agreed.
        </p>

        <h2>Week 1–2 — Build: configuration and data import</h2>
        <p>
          This is where the approved plan becomes a working system, in parallel with — not instead of — the
          business running normally on its existing tools. Roles and permissions get configured. Pipeline
          stages, checklists, and templates get built to match the approved plan, not a generic default.
          Existing clients, properties, and open deals get imported and cleaned.
        </p>
        <p>
          "Cleaned" is doing real work in that sentence. Migrated data that's just dumped in raw — duplicate
          clients, properties with no address format, leads with no stage — creates more mess than it solves.
          A real migration includes someone checking the data makes sense before the team ever logs in.
        </p>

        <PullQuote>
          The team keeps using their current tools through week 2. Nobody is asked to switch systems before
          the new one is ready for them.
        </PullQuote>

        <h2>Week 2–3 — Train: role-based, not one-size-fits-all</h2>
        <p>
          This is the step most rollouts get wrong, and it's the one that actually determines whether a system
          gets adopted or quietly abandoned after month one. Training the whole company on the whole system at
          once means an owner sits through dispatch training they'll never use, and a foreman sits through
          pipeline training that's irrelevant to a phone-only Field Mode view.
        </p>
        <p>
          Instead: separate, short sessions by role. Owners and office managers get the full picture.
          Sales reps get the pipeline, follow-up rhythm, and estimating tools. Foremen and laborers get exactly
          Field Mode — today's assigned work, time tracking, the end-of-day report — and nothing else, because
          nothing else is relevant to their day. A crew member training session for a tool this scoped takes
          about 15 minutes, not an afternoon.
        </p>

        <h2>Week 3 — Go live: supported, not abandoned</h2>
        <p>
          Go-live day isn't "good luck." A dedicated implementation lead stays on call for the first 30 days
          specifically because the first two weeks of real use surface questions no amount of training
          anticipates — "where does this specific edge case go" questions that are easy to answer in five
          minutes and demoralizing to sit with for a week.
        </p>
        <p>
          The old tools stay accessible (read-only is fine) during this period, but the goal is that nobody
          needs them — if week 1 and 2 were done right, there shouldn't be a reason to open the old spreadsheet
          again by day three of being live.
        </p>

        <h2>What makes this possible in 2–3 weeks, not 2–3 months</h2>
        <p>
          The honest answer: scoping discipline in week 1, and refusing to let "while we're in there, let's
          also change X" creep expand the build. A rollout that stays focused on migrating what already works
          and improving the specific, named pain points from discovery moves fast. A rollout that turns into a
          full operational redesign halfway through takes months — and usually loses momentum before it
          finishes.
        </p>
      </ArticleBody>

      <section class="section" style="padding-top: 0;">
        <div class="wrap" style="max-width: 700px; margin: 0 auto;">
          <AuthorByline initials={post.authorInitials} name={post.authorName} role={post.authorRole} />
        </div>
      </section>

      <RelatedPosts
        items={related.map((p) => ({ href: `/blog/${p.slug}`, tag: p.tag, title: p.title }))}
      />

      <CTABand
        title={<>Bring your data. See a real rollout&nbsp;plan.</>}
        description="A specialist will show you what week 1 scoping looks like for your specific pipeline and tools."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
