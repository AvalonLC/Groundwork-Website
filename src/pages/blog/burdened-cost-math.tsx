import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { ArticleHero, ArticleBody, PullQuote, AuthorByline, RelatedPosts } from '../../components/Blog'
import { getPostBySlug, getRelatedPosts } from '../../data/blog'

export function BurdenedCostMathPost() {
  const post = getPostBySlug('burdened-cost-math')!
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
          Here's a quiet way a profitable-looking service business loses money on every single job: pricing
          labor off the number on the paycheck instead of the number it actually costs the business to put a
          person on a truck.
        </p>
        <p>
          Say a crew member makes $24.00/hr. A lot of estimates — built fast, built from memory, built under
          deadline pressure — price that labor hour at something close to $24.00, maybe with a flat markup
          tacked on. The real cost is higher, and the gap between the two numbers is where margin quietly
          disappears, one job at a time, for months before anyone notices in the bank balance.
        </p>

        <h2>What "fully burdened" actually means</h2>
        <p>
          A fully burdened labor rate is the wage plus everything the business pays on top of it to legally
          and safely employ that person for the hour: payroll tax, workers' compensation insurance, benefits,
          and — often missed entirely — an allocation of the equipment that hour of labor depends on.
        </p>
        <p>Using a real example from a landscape crew:</p>
        <ul>
          <li>Base wage: <strong>$24.00/hr</strong></li>
          <li>Payroll tax, workers' comp, benefits: <strong>+$9.80/hr</strong></li>
          <li>Equipment allocation (the mower, the trailer, the fuel — amortized per labor hour): <strong>+$4.10/hr</strong></li>
          <li>Fully burdened rate: <strong>$37.90/hr</strong></li>
        </ul>
        <p>
          That's not a $24 labor hour. It's a $37.90 labor hour wearing a $24 sticker price. Every estimate
          priced against the sticker instead of the burdened rate is quietly eating 37% of its own margin on
          labor alone, before materials, before overhead, before anything else goes wrong on the job.
        </p>

        <PullQuote>
          This is the same math whether you're quoting a job by hand on a clipboard or inside a CRM. The CRM
          just makes it impossible to accidentally skip.
        </PullQuote>

        <h2>It's not just labor — equipment rates hide the same gap</h2>
        <p>
          The same logic applies to machine rates. A skid steer doesn't cost what the loan payment on it costs
          per hour — fuel, maintenance, insurance, and depreciation all belong in that number too. A business
          quoting equipment time at "what we pay for it" instead of "what it costs us to run it" is making the
          exact same mistake as the labor example above, just less visibly, because nobody's paycheck makes the
          gap obvious.
        </p>

        <h2>"Competitive" and "profitable" are different questions</h2>
        <p>
          A bid that undercuts three competitors by pricing off wage instead of burdened cost isn't actually
          competitive — it's a bid that will lose money the moment it's won. The business that wins it will
          either discover the gap at tax time, when it's too late to do anything about the jobs already
          completed, or worse, never discover it at all and just quietly struggle for years without knowing
          why margins never seem to improve no matter how busy the crews are.
        </p>
        <p>
          The uncomfortable version of this: being fully booked and being profitable are not the same
          condition. A lot of "we're so busy, why aren't we making more money" conversations trace straight
          back to a burdened rate that was never calculated, sitting underneath every single estimate the
          company has sent out.
        </p>

        <h2>Where this number needs to live</h2>
        <p>
          The fix isn't complicated math — it's making the fully burdened rate the <em>only</em> number anyone
          is allowed to price against, calculated once, correctly, and then reused automatically on every
          estimate, every job cost, every margin report. The moment that rate lives in a spreadsheet that's
          easy to skip or a memory that's easy to round down "just this once," the leak comes back.
        </p>
        <p>
          That's the specific problem this math is built to solve once, centrally, instead of re-deriving (or
          skipping) it under deadline pressure on every single quote.
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
        title={<>See Budget &amp; Rates price a job for&nbsp;real.</>}
        description="A specialist will walk through the burdened-cost engine behind every estimate and every margin report."
        secondaryHref="/product/financial"
        secondaryLabel="See Budget & Rates"
      />
    </Layout>
  )
}
