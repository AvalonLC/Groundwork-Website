import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function AiAssistedNotAutomatedPost() {
  const post = getPostBySlug('ai-assisted-not-automated')!
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
          Every CRM vendor says "AI-powered" now. Most of what's behind that phrase is a chatbot bolted onto a
          help center, or a feature that quietly auto-sends messages on a customer's behalf and hopes nobody
          minds. We drew a different, deliberate line with Groundwork AI, and it's worth explaining why — both
          what it does and, just as importantly, what it's built not to do.
        </p>

        <h2>What Groundwork AI actually watches</h2>
        <p>
          Groundwork AI sits across the whole system rather than living inside one module, because the
          problems worth catching usually involve information from more than one place. Its most visible job
          today: scanning the pipeline for deals that are quietly going cold — no contact in several days,
          a missed follow-up, a proposal sent and never reopened — and surfacing them as a specific, actionable
          alert instead of a buried row on a kanban board.
        </p>
        <p>
          A flagged deal looks like this: the dollar amount at risk, the specific reason it's flagged ("no
          contact 7 days"), and a suggested action grounded in actual outcome data — "a personal check-in call
          today; deals with no contact past 5 days lose 3x the close rate for every week they sit." Not a
          generic nudge. A specific recommendation tied to a number a rep can act on in the next five minutes.
        </p>

        <h2>Where we drew the line, on purpose</h2>
        <p>
          Here's the part that matters more than the feature list: Groundwork AI surfaces and suggests. It does
          not send the follow-up message, reschedule the job, or change the price on an estimate without a
          human deciding to do it. That's not a current limitation we plan to remove later — it's a design
          decision we think is right for the kind of relationships this business is built on.
        </p>
        <ul>
          <li><strong>It flags, you decide.</strong> At-risk deal alerts and suggested actions are recommendations a rep or owner chooses to act on — never an automatic message sent to a customer without a person reviewing it first.</li>
          <li><strong>It explains itself.</strong> Every suggestion comes with the reasoning behind it, not just a conclusion. "Here's why" is non-negotiable for anything touching a customer relationship.</li>
          <li><strong>It doesn't touch the money without you.</strong> Pricing, invoicing, and anything that changes what a customer owes stays a human decision, full stop.</li>
        </ul>

        <PullQuote>
          The line isn't "what can the model technically do." The line is "what should happen to a customer
          relationship without a human in the loop" — and for us, the answer is: not much.
        </PullQuote>

        <h2>Why this matters more in service businesses than almost anywhere else</h2>
        <p>
          A lot of software categories can get away with full automation because the stakes of a bad automated
          decision are low — a slightly-off product recommendation, a mistimed marketing email. Service
          businesses run on repeat relationships with people who live in the community being served. An
          automatically-sent, wrongly-timed message to a customer whose pool just flooded doesn't read as
          "efficient." It reads as a company that doesn't actually know its customers — because, in that
          moment, it genuinely wouldn't have.
        </p>
        <p>
          Keeping a human in the loop on anything customer-facing isn't a limitation we're working around. It's
          the reason we think Groundwork AI earns trust instead of generating the kind of "why did the system
          do that" conversations that make teams turn automation features off within a month of turning them on.
        </p>

        <h2>How it's actually priced, and why that matters too</h2>
        <p>
          Groundwork AI is a shared, company-wide allowance included on every plan — not billed per user, and
          not something that makes adding a new office hire more expensive because they might use it. An owner,
          a rep, and someone in the field all draw from the same pool. That's a deliberate choice too: we didn't
          want "AI" to become another per-seat line item that discourages a team from actually using the thing
          that's supposed to help them.
        </p>

        <h2>Where this goes next</h2>
        <p>
          We'll keep expanding what Groundwork AI watches for — more surfaces, more specific, grounded
          suggestions. What won't change is the shape of the thing: it tells you what it noticed and why, it
          recommends what to do about it, and a person still decides. That's "AI-assisted." We think it's the
          right amount of AI for a business built on relationships with real people, not the maximum amount
          that's technically possible.
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
        title={<>Try Groundwork AI flag a cooling deal, live.</>}
        description="The interactive demo includes a real Groundwork AI Coach panel, no signup required."
        secondaryHref="/explore"
        secondaryLabel="Try the interactive demo"
      />
    </Layout>
  )
}
