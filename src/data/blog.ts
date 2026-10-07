// Blog post metadata — single source of truth for slug, title, tag, date,
// read time, teaser description, and byline. Consumed by:
//   - src/pages/blog/index.tsx (the index grid)
//   - src/pages/resources.tsx (the "Latest from the blog" teaser section)
//   - each src/pages/blog/<slug>.tsx post (hero fields, via getPostBySlug)
//   - src/index.tsx (sitemap.xml slug list)
// Keeping this centralized means a post's title/date/tag never drifts
// between where it's linked and where it's actually written.

export interface BlogPost {
  slug: string
  title: string
  tag: string
  date: string
  readTime: string
  desc: string
  authorInitials: string
  authorName: string
  authorRole: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'discovery-call-framework',
    title: 'How to run a discovery call for a $50k landscape sale',
    tag: 'Sales',
    date: 'Oct 2026',
    readTime: '8 min read',
    desc: 'A step-by-step framework for the discovery call that separates budget-qualified leads from tire-kickers.',
    authorInitials: 'TR',
    authorName: 'Tyler Reid',
    authorRole: 'CEO · Founder, Groundwork',
  },
  {
    slug: 'dispatch-board-leadership-tool',
    title: 'The dispatch board is a leadership tool',
    tag: 'Operations',
    date: 'Oct 2026',
    readTime: '6 min read',
    desc: 'Why your scheduling screen tells you more about the health of your ops than any KPI report.',
    authorInitials: 'DT',
    authorName: 'Derek Thompson',
    authorRole: 'VP Ops & Implementation, Groundwork',
  },
  {
    slug: 'three-morning-dashboards',
    title: 'The three dashboards every service business owner should open in the morning',
    tag: 'Owner',
    date: 'Sep 2026',
    readTime: '10 min read',
    desc: 'Business Pulse, Financial Snapshot, Money Loop, Operations Snapshot — and what to do with each in the first 15 minutes of the day.',
    authorInitials: 'AR',
    authorName: 'Angela Ruiz',
    authorRole: 'VP Product, Groundwork',
  },
  {
    slug: 'burdened-cost-math',
    title: 'Why "competitive" and "profitable" are not the same number',
    tag: 'Estimating',
    date: 'Sep 2026',
    readTime: '9 min read',
    desc: "The burdened-cost math that should be behind every price you charge — and what happens to a business that prices off the wage on the paycheck instead.",
    authorInitials: 'TR',
    authorName: 'Tyler Reid',
    authorRole: 'CEO · Founder, Groundwork',
  },
  {
    slug: 'what-a-3-week-rollout-looks-like',
    title: 'What a 2-3 week CRM rollout actually looks like',
    tag: 'Implementation',
    date: 'Sep 2026',
    readTime: '7 min read',
    desc: 'A week-by-week breakdown of switching a service business off spreadsheets and sticky notes — without losing a month of productivity to "getting set up."',
    authorInitials: 'DT',
    authorName: 'Derek Thompson',
    authorRole: 'VP Ops & Implementation, Groundwork',
  },
  {
    slug: 'the-follow-up-gap',
    title: "The follow-up that never happens: your pipeline's biggest leak",
    tag: 'Sales',
    date: 'Aug 2026',
    readTime: '7 min read',
    desc: "Most lost deals aren't lost to a competitor — they're lost to silence. Why follow-up discipline is a system problem, not a willpower problem.",
    authorInitials: 'AR',
    authorName: 'Angela Ruiz',
    authorRole: 'VP Product, Groundwork',
  },
  {
    slug: 'ai-assisted-not-automated',
    title: '"AI-assisted," not "AI-automated" — why we drew that line',
    tag: 'Product',
    date: 'Aug 2026',
    readTime: '8 min read',
    desc: 'What Groundwork AI actually does with your data — and the specific, deliberate limits on what it does without a human in the loop.',
    authorInitials: 'MK',
    authorName: 'Marcus Kolar',
    authorRole: 'VP Engineering, Groundwork',
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count)
}
