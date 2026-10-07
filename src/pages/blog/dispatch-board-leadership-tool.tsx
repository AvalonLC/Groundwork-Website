import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function DispatchBoardLeadershipToolPost() {
  const post = getPostBySlug('dispatch-board-leadership-tool')!
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
          Owners ask for a monthly ops report. What they actually need is already sitting in front of them
          every morning, and most of them aren't reading it that way: the dispatch board.
        </p>
        <p>
          A KPI report tells you what happened last month. The dispatch board tells you what's happening right
          now, and if you know how to read it, it tells you exactly where leadership attention needs to go
          today — not in next month's review meeting, when the problem has already compounded.
        </p>

        <h2>What a healthy board actually looks like</h2>
        <p>
          Not "everything green." A board with zero problems flagged usually means nobody's looking closely
          enough, not that the week is going perfectly. A healthy board has a predictable, small number of
          flagged items — capacity conflicts caught before they become no-shows, a crew running behind that got
          noticed at 10am instead of at 5pm when the customer calls to ask where everyone is.
        </p>
        <p>The four things worth scanning every morning, in this order:</p>
        <ul>
          <li><strong>Active crews vs. scheduled jobs.</strong> A mismatch here — more scheduled than you have crew-hours for — is a Tuesday problem hiding as a Monday statistic.</li>
          <li><strong>Check-in times.</strong> Crews checking in later and later over a week is an early signal of a route problem, a crew-size problem, or a morale problem — long before anyone complains out loud.</li>
          <li><strong>In-progress vs. completed, by hour.</strong> If 60% of the day's jobs are still "in progress" at 3pm, something is running long, and it's worth knowing which crew and which job type before it happens again tomorrow.</li>
          <li><strong>The activity feed.</strong> The small stream of "Crew A checked in," "Crew C en route" events is boring until the day it isn't — the day a crew doesn't check in at all.</li>
        </ul>

        <PullQuote>
          A dispatch board isn't a scheduling tool with some reporting bolted on. It's a leadership tool that
          happens to also schedule crews.
        </PullQuote>

        <h2>Recurring services hide in plain sight</h2>
        <p>
          Here's the part that catches owners off guard: recurring maintenance contracts — the bi-weekly
          mow-and-blow routes, the weekly service stops — generate the steadiest revenue and get the least
          attention, because they're supposed to run on autopilot. That's exactly why they're worth a second
          look on the board, not less.
        </p>
        <p>
          A contract flagged "Needs Review" sitting quietly in a list is cheap to miss and expensive to ignore.
          It usually means a scope creep conversation that never happened, a crew that's started skipping a
          step, or a customer who's about to churn and hasn't said so yet. The dispatch board surfaces it as a
          single flagged row. The alternative is finding out when the customer cancels.
        </p>

        <h2>Dispatch is where office and field actually meet</h2>
        <p>
          Every other system in a service business — the pipeline, the estimate, the invoice — lives primarily
          in one world or the other: office-side paperwork, or field-side execution. Dispatch is the hinge. The
          job that was sold in the office becomes the work order a foreman reads on a phone at 6:45am. If
          something's wrong with that handoff — missing scope, no access notes, the wrong crew size — it shows
          up on the dispatch board before it shows up anywhere else.
        </p>
        <p>
          That's why we think of the board as a leadership tool, not an admin task. An office manager who
          treats it as a to-do list to clear will miss the pattern. An owner or ops lead who treats it as the
          morning pulse-check of the whole operation will catch problems while they're still a flagged row, not
          a furious phone call.
        </p>

        <h2>The one habit worth building</h2>
        <p>
          Open the dispatch board before you open email. Scan the four things above. Takes two minutes most
          days. The days it takes longer are exactly the days it mattered most.
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
        title={<>See the dispatch board this post is talking&nbsp;about.</>}
        description="Schedule, dispatch, recurring services, and work orders — a specialist will walk through the real screen."
        secondaryHref="/product/operations"
        secondaryLabel="See Operations"
      />
    </Layout>
  )
}
