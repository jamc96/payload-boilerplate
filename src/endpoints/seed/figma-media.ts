import type { Media } from '@/payload-types'

type SiteMediaMeta = Omit<Media, 'createdAt' | 'id' | 'updatedAt'>

/** Figma node `1:122` — tablet dashboard hero image */
export const marketingHeroImage: SiteMediaMeta = {
  alt: 'Tablet showing efficiency dashboard over a green hills landscape',
}

/** Figma logo cloud nodes `1:128`–`1:138` */
export const demoLogoImages: SiteMediaMeta[] = [
  { alt: 'Partner logo — abstract mark' },
  { alt: 'Partner logo — shield' },
  { alt: 'Partner logo — circular mark' },
  { alt: 'Partner logo — wordmark bold' },
  { alt: 'Partner logo — serif wordmark' },
  { alt: 'Partner logo — oval wordmark' },
]

/** Figma node `1:166` — benefits section landscape */
export const demoBenefitsImage: SiteMediaMeta = {
  alt: 'Colorful mountain landscape',
}

/** Figma node `1:187` — feature split pedestals */
export const demoFeatureSplitImage: SiteMediaMeta = {
  alt: 'Minimalist pedestals on a warm beige background',
}

/** Figma node `1:224` — testimonial portrait */
export const demoTestimonialImage: SiteMediaMeta = {
  alt: 'Stacked stone spheres',
}

/** Figma node `1:250` — coastal aerial landscape */
export const demoMediaHeroImage: SiteMediaMeta = {
  alt: 'Aerial view of a winding coastal road through green hills',
}

export const FIGMA_MEDIA_PATHS = {
  hero: 'media/figma/demo-hero.png',
  logos: [
    'media/figma/demo-logo-1.png',
    'media/figma/demo-logo-2.png',
    'media/figma/demo-logo-3.png',
    'media/figma/demo-logo-4.png',
    'media/figma/demo-logo-5.png',
    'media/figma/demo-logo-6.png',
  ],
  benefits: 'media/figma/demo-benefits.jpg',
  featureSplit: 'media/figma/demo-feature-split.jpg',
  testimonial: 'media/figma/demo-testimonial.jpg',
  mediaHero: 'media/figma/demo-media-hero.jpg',
} as const
