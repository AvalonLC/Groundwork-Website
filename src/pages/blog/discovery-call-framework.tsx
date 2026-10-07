import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function DiscoveryCallFrameworkPost() {
  const post = getPostBySlug('discovery-call-framework')!
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
          A $5,000 mulch-and-cleanup job and a $50,000 backyard redesign get discovered the same way in most
          CRMs: a note field and a gut feeling. That's fine for the mulch job. It is how six-figure proposals
          die quietly at Decision Pending.
        </p>
        <p>
          The gap is almost never the estimate. It's the discovery call that happened — or didn't happen —
          before the estimate was built. Here's the framework we teach inside Sales Academy, adapted for
          anyone running it today, with or without software behind it.
        </p>

        <h2>Why the intro call is not a sales call</h2>
        <p>
          The instinct on a $50k inquiry is to get excited and start selling the outcome. Resist it. The intro
          call has exactly one job: confirm this is worth an on-site visit, and agree with the customer on what
          happens next. That's it. Nothing closes on this call, and nothing should.
        </p>
        <p>
          What the intro call needs to establish:
        </p>
        <ul>
          <li><strong>Is there a real project, or a research project?</strong> "We're thinking about redoing the backyard eventually" and "we're hosting a wedding in nine weeks" are different calls.</li>
          <li><strong>Who else is involved in the decision?</strong> If a spouse, business partner, or HOA board needs to sign off and isn't on this call, find out now — not at the proposal.</li>
          <li><strong>What's the trigger?</strong> A leaking pool, a sold house, an insurance claim, a milestone birthday — the trigger tells you the real timeline, which is usually different from what they say out loud.</li>
        </ul>
        <p>
          End every intro call the same way: restate what you heard, confirm the on-site date, and tell them
          exactly what to expect from it. Ambiguity here is where tire-kickers linger and real prospects get
          nervous.
        </p>

        <h2>The on-site consultation: four things, every time</h2>
        <p>
          This is where a $50k sale is actually won or lost, and it happens weeks before the number gets
          written down. A rep who shows up without a structure will get a tour and a vague "let us know what
          you think." A rep with a structure leaves with everything needed to build a scope that doesn't need a
          second visit.
        </p>
        <p>Four things to document on every site walk, without exception:</p>
        <ul>
          <li><strong>The property.</strong> Measurements, access constraints, existing conditions, utility locations, anything that becomes a change order if it's missed now.</li>
          <li><strong>The desired result.</strong> Not "a nicer backyard" — the specific outcome. "Somewhere to host 40 people without the lawn getting torn up" is a brief. "A nicer backyard" is not.</li>
          <li><strong>The stakeholders.</strong> Everyone who has to say yes, and whether they're in the room or not.</li>
          <li><strong>The constraints.</strong> Budget range (even a rough one), timeline, HOA rules, anything that will shape which options are even worth presenting.</li>
        </ul>
        <p>
          Reps who skip the budget conversation out of politeness are the ones who build a $65k proposal for a
          customer with a $30k ceiling — and then wonder why "great meeting, I'll think about it" turned into
          silence.
        </p>

        <PullQuote>
          A proposal built without a documented budget conversation isn't an estimate. It's a guess with a
          cover page.
        </PullQuote>

        <h2>Presenting options, not a number</h2>
        <p>
          A single total invites a single response: yes or no. Three options — a baseline scope, the
          recommended scope, and a stretch version with the add-ons that came up during discovery — invites a
          conversation. Most $50k sales actually land in the middle tier, but customers choose it with far more
          confidence when they can see what they're not getting at the lower price and what more looks like at
          the higher one.
        </p>
        <p>
          Present in person or on video when the deal size justifies it. A $50k proposal that gets emailed with
          no walkthrough call is a $50k proposal that gets forgotten by Thursday.
        </p>

        <h2>Decision Pending is a stage, not a shrug</h2>
        <p>
          "Let me think about it" is not a stall tactic to be feared — it's information. The job at this stage
          is to find out what, specifically, needs thinking about, and put a name and a date on resolving it.
          "I'll follow up Friday" with no reason attached is how six-figure pipelines quietly die of a thousand
          unanswered "just checking in!" emails.
        </p>
        <p>
          Every open concern at Decision Pending should have three things attached: an owner (usually the rep,
          sometimes the customer), a concrete next action, and a due date. If none of those three things exist,
          the deal isn't pending — it's lost and nobody's said so yet.
        </p>

        <h2>The takeaway</h2>
        <p>
          None of this requires software. It requires a rep who treats the intro call, the site walk, and the
          proposal presentation as three distinct, structured conversations instead of one long improvisation.
          What software adds is consistency across reps who don't all have ten years of instinct for this
          yet — stage checklists that won't let discovery be skipped, and a follow-up rhythm that makes
          "Decision Pending" impossible to quietly forget.
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
        title={<>See the pipeline this framework is built&nbsp;into.</>}
        description="Sales Academy renders your actual pipeline stages and trains new reps on exactly this structure."
        secondaryHref="/academy/sales"
        secondaryLabel="See Sales Academy"
      />
    </Layout>
  )
}
