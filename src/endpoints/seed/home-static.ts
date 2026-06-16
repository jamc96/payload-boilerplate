import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Home',
  hero: {
    type: 'glanceHero',
    headline: 'Browse everything.',
    backgroundColor: '#8E9C78',
  },
  layout: [],
  meta: {
    description: 'Glance — browse everything with real insights, without the data overload.',
    title: 'Glance',
  },
}
