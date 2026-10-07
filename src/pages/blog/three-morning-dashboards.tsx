import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function ThreeMorningDashboardsPost() {
  const post = getPostBySlug('three-morning-dashboards')!
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
          Ask ten service business owners what they check first in the morning and you'll get ten different
          answers — email, a group text with the foreman, the bank balance on a phone app. None of those tell
          you the three things that actually determine whether the business is healthy this week: is the
          pipeline full, is the cash honest, and is the field capacity matched to demand.
        </p>
        <p>
          Here's the 15-minute morning routine we'd recommend to any owner, software or not — and what each
          dashboard is actually for when you do have it.
        </p>

        <h2>1. Business Pulse — is the pipeline healthy?</h2>
        <p>
          Business Pulse exists to answer one question fast: if nothing changes, where does revenue land this
          quarter? It's pipeline value, close rate, sold-month-to-date, open proposals, and — the number most
          owners skip past too quickly — at-risk deals.
        </p>
        <p>
          The habit worth building: don't just glance at the top-line pipeline value. Scan the at-risk list
          specifically. A deal that's gone quiet for a week looks identical to a healthy deal on a kanban board
          unless something is actively flagging it. That's the five minutes that catches a $58,000 proposal
          before it goes cold, not after.
        </p>

        <h2>2. Financial Snapshot &amp; Money Loop — is the cash honest?</h2>
        <p>
          This is the one owners most often get wrong, and it's not their fault — most financial dashboards are
          built for accountants, not operators. "Are we covering what it costs to keep the doors open?" is a
          simple question. Most P&amp;L views make it take ten minutes of mental math to answer.
        </p>
        <p>
          Money Loop exists specifically to turn overhead recovery into one honest number — what percentage of
          this year's cost-to-operate is actually covered so far — instead of a spreadsheet nobody opens
          outside of tax season. Pair it with the basics: outstanding invoices, deposits collected, cash in vs.
          cash out. Five minutes here answers the question that actually keeps owners up at night, which isn't
          "are we profitable on paper" — it's "can we make payroll in three weeks."
        </p>

        <PullQuote>
          Profitable and solvent are not the same thing. A dashboard that only shows you one of them is showing
          you half the picture.
        </PullQuote>

        <h2>3. Operations Snapshot — is capacity matched to demand?</h2>
        <p>
          Crews out, jobs scheduled, work orders in progress, capacity vs. demand — this is the dashboard that
          tells you whether tomorrow is already a problem. An owner who only checks this reactively, when a
          customer calls asking where their crew is, has already lost the two or three days where the overbook
          could have been caught and fixed quietly.
        </p>
        <p>
          The specific habit: compare capacity vs. demand for the coming week, not just today. A single
          overbooked day is a scheduling fix. A week trending overbooked is a hiring conversation that needs to
          start now, not in three weeks when it's an emergency.
        </p>

        <h2>Why these three, and not more</h2>
        <p>
          It's tempting to build (or demand) a dashboard with everything on it. In practice, more numbers on a
          morning screen means less attention paid to any single one of them. Pipeline health, cash health,
          and capacity health are the three load-bearing questions for a service business on any given week.
          Everything else — detailed job costing, individual rep performance, marketing attribution — is real
          and important, but it's a weekly or monthly review question, not a "first 15 minutes of the day"
          question.
        </p>
        <p>
          If your morning routine right now is email and a gut feeling, start smaller than you think: pick one
          of these three questions, find the fastest way to answer it honestly every morning, and build the
          habit before adding the second one.
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
        title={<>See Business Pulse built around your own&nbsp;numbers.</>}
        description="A specialist will show Business Pulse, Financial Snapshot, Money Loop, and Operations Snapshot with your real pipeline."
        secondaryHref="/roles/owners"
        secondaryLabel="See the Owner view"
      />
    </Layout>
  )
}
