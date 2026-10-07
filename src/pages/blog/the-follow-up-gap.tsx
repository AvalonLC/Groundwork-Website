import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function TheFollowUpGapPost() {
  const post = getPostBySlug('the-follow-up-gap')!
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
          Ask a sales rep why a deal was lost and you'll usually hear a competitor, a budget problem, or bad
          timing. Pull the actual history on most of those "lost to a competitor" deals and a different pattern
          shows up far more often: nobody followed up for eleven days after the proposal went out, and by the
          time someone did, the customer had already moved on — not necessarily to a competitor, sometimes just
          to indecision that calcified into "no" by default.
        </p>
        <p>
          The follow-up gap is the single biggest leak in most service-business pipelines, and it's almost
          never a willpower problem. Reps aren't lazy. The gap exists because follow-up, left to memory and
          good intentions, loses a fair fight against a ringing phone, a walk-in customer, and forty other open
          deals every single day.
        </p>

        <h2>Why "I'll just remember" doesn't survive contact with a busy week</h2>
        <p>
          A rep with eight open deals can hold the follow-up schedule in their head. A rep with thirty can't —
          not because they're disorganized, but because the human brain is a genuinely bad tool for tracking
          thirty independent timers with different durations, all competing for attention against whoever is
          calling or walking in <em>right now</em>.
        </p>
        <p>
          The deals that lose out in that competition aren't random. They're disproportionately the ones that
          are quiet — no inbound call, no urgent email — which is exactly the deal most likely to need an
          outbound nudge, and exactly the deal least likely to get one without a system forcing the issue.
        </p>

        <h2>The data behind "3x the close rate"</h2>
        <p>
          This isn't an abstract concern. Deals with no contact for five or more days close at roughly a third
          the rate of deals where someone reached back out inside that window. The mechanism isn't mysterious —
          every day of silence after a proposal is a day the customer's attention and urgency are freely
          available to drift toward "I'll deal with this later," a competitor who did call, or simply forgetting
          the project was ever a priority.
        </p>
        <p>
          The flip side matters just as much: reps who follow up within 24 hours of a deal going quiet recover
          roughly 4 in 10 of those stalled deals. That's not a marginal improvement from being diligent — that's
          the difference between a healthy pipeline and a pipeline that's quietly bleeding revenue nobody
          notices until the quarterly numbers come in soft.
        </p>

        <PullQuote>
          Most lost deals aren't lost to a competitor. They're lost to silence — and silence is a system
          failure, not a sales failure.
        </PullQuote>

        <h2>What an actual follow-up rhythm looks like</h2>
        <p>
          The fix isn't "try harder to remember." It's building a cadence into the pipeline stage itself, so
          the follow-up obligation exists independent of any one rep's memory or workload that week:
        </p>
        <ul>
          <li><strong>A default cadence per stage.</strong> A deal sitting in Decision Pending with no contact in 5 days should surface itself — not require a rep to think to check.</li>
          <li><strong>Overdue should be impossible to ignore.</strong> Not a report someone runs weekly — a visible, present flag on the deal itself, today, before it's been quiet for a week.</li>
          <li><strong>A specific next action, not a vague reminder.</strong> "Follow up" is not useful. "Send the still-thinking-it-over template" or "call about the budget conversation from the site walk" is.</li>
        </ul>

        <h2>The template matters less than the timing</h2>
        <p>
          Reps sometimes over-invest in finding the perfect follow-up message and under-invest in simply
          sending something inside 24 hours of a deal going quiet. A decent message sent on day one beats a
          great message sent on day eleven, every time. Build the system that makes day one happen reliably,
          and the message itself matters much less than it feels like it should.
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
        title={<>See a follow-up rhythm that actually&nbsp;runs itself.</>}
        description="A specialist will show you how overdue follow-ups surface automatically, stage by stage."
        secondaryHref="/product/sales"
        secondaryLabel="See Sales"
      />
    </Layout>
  )
}
