import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

import { customLink, pageLink } from './linkHelpers'

type HomeArgs = {
  contactPageId: number | string
  heroImage: Media
  image1: Media
  image2: Media
  image3: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactPageId,
  heroImage,
  image1,
  image2,
  image3,
}) => {
  const contactCta = pageLink(contactPageId, 'Learn More')
  const discoverMoreCta = pageLink(contactPageId, 'Discover More', { appearance: 'secondary' })

  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    hero: {
      type: 'glanceHero',
      headline: 'Browse everything.',
      media: heroImage.id,
      imageFrameColor: 'midGreen',
    },
    layout: [
      {
        blockType: 'logoCloud',
        label: 'Trusted by:',
        logos: [
          { image: image1.id, alt: 'Partner logo 1' },
          { image: image2.id, alt: 'Partner logo 2' },
          { image: image3.id, alt: 'Partner logo 3' },
          { image: image1.id, alt: 'Partner logo 4' },
          { image: image2.id, alt: 'Partner logo 5' },
          { image: image3.id, alt: 'Partner logo 6' },
        ],
      },
      {
        blockType: 'benefits',
        sectionHeader: {
          eyebrow: 'Benefits',
          heading: "We've cracked the code.",
          description: 'Glance provides real insights, without the data overload.',
          align: 'left',
        },
        items: [
          {
            icon: 'cable',
            title: 'Amplify Insights',
            description:
              'Unlock data-driven decisions with comprehensive analytics, revealing key opportunities for strategic regional growth.',
          },
          {
            icon: 'earth',
            title: 'Control Your Global Presence',
            description:
              'Manage and track satellite offices, ensuring consistent performance and streamlined operations everywhere.',
          },
          {
            icon: 'user',
            title: 'Remove Language Barriers',
            description:
              'Adapt to diverse markets with built-in localization for clear communication and enhanced user experience.',
          },
          {
            icon: 'barChart',
            title: 'Visualize Growth',
            description:
              'Generate precise, visually compelling reports that illustrate your growth trajectories across all regions.',
          },
        ],
        image: image1.id,
      },
      {
        blockType: 'featureSplit',
        sectionHeader: {
          heading: 'See the Big Picture',
          description:
            "Glance turns your data into clear, vibrant visuals that show you exactly what's happening in each region.",
          align: 'left',
        },
        items: [
          {
            number: '01',
            text: 'Spot Trends in Seconds: No more digging through numbers.',
          },
          {
            number: '02',
            text: 'Get Everyone on the Same Page: Share easy-to-understand reports with your team.',
          },
          {
            number: '03',
            text: 'Make Presentations Pop: Interactive maps and dashboards keep your audience engaged.',
          },
          {
            number: '04',
            text: 'Your Global Snapshot: Get a quick, clear overview of your entire operation.',
          },
        ],
        cta: discoverMoreCta,
        image: image2.id,
        imagePosition: 'right',
      },
      {
        blockType: 'comparisonTable',
        sectionHeader: {
          eyebrow: 'Specs',
          heading: 'Why Choose Glance?',
          description:
            "You need a solution that keeps up. That's why we developed Glance. A developer-friendly approach to streamline your business.",
          align: 'center',
        },
        cta: discoverMoreCta,
        columns: [
          {
            name: 'Glance',
            highlighted: true,
            features: [
              { included: true, label: 'Ultra-fast browsing' },
              { included: true, label: 'Advanced AI insights' },
              { included: true, label: 'Seamless integration' },
              { included: true, label: 'Advanced AI insights' },
              { included: true, label: 'Ultra-fast browsing' },
              { included: true, label: 'Full UTF-8 support' },
            ],
          },
          {
            name: 'WebSurge',
            highlighted: false,
            features: [
              { included: true, label: 'Fast browsing' },
              { included: true, label: 'Basic AI recommendations' },
              { included: true, label: 'Restricts customization' },
              { included: false, label: 'Basic AI insights' },
              { included: true, label: 'Fast browsing' },
              { included: false, label: 'Potential display errors' },
            ],
          },
          {
            name: 'HyperView',
            highlighted: false,
            features: [
              { included: false, label: 'Moderate speeds' },
              { included: false, label: 'No AI assistance' },
              { included: false, label: 'Steep learning curve' },
              { included: false, label: 'No AI assistance' },
              { included: false, label: 'Moderate speeds' },
              { included: false, label: 'Partial UTF-8 support' },
            ],
          },
        ],
      },
      {
        blockType: 'testimonial',
        image: image3.id,
        quote:
          "I was skeptical, but Glance has completely transformed the way I manage my business. The data visualizations are so clear and intuitive, and the platform is so easy to use. I can't imagine running my company without it.",
        authorName: 'John Smith',
        authorTitle: 'Head of Data',
      },
      {
        blockType: 'processSteps',
        headline: 'Map Your Success',
        cta: discoverMoreCta,
        steps: [
          {
            number: '01',
            title: 'Get Started',
            description: "With our intuitive setup, you're up and running in minutes.",
          },
          {
            number: '02',
            title: 'Customize and Configure',
            description: 'Adapt Glance to your specific requirements and preferences.',
          },
          {
            number: '03',
            title: 'Grow Your Business',
            description: 'Make informed decisions to exceed your goals.',
          },
        ],
      },
      {
        blockType: 'mediaHero',
        media: image1.id,
        alt: 'Landscape view',
      },
      {
        blockType: 'ctaCentered',
        sectionHeader: {
          heading: 'Connect with us',
          description:
            'Schedule a quick call to learn how Glance can turn your regional data into a powerful advantage.',
          align: 'center',
        },
        cta: {
          ...contactCta,
          appearance: 'linkout',
          fullWidth: true,
        },
      },
    ],
    meta: {
      description: 'Glance — browse everything with real insights, without the data overload.',
      image: heroImage.id,
      title: 'Glance',
    },
  }
}
