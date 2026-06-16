import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { GlanceSection } from '@/components/GlanceSection'
import { Media } from '@/components/Media'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  authorName,
  authorTitle,
  image,
  quote,
}) => {
  return (
    <section
      className="border-t border-glance-divider bg-glance-bg pb-[120px] pt-20"
      data-testid="block-testimonial"
    >
      <GlanceSection as="div">
        <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
          {image && typeof image === 'object' && (
            <div className="w-full shrink-0 overflow-hidden rounded-[var(--glance-radius-image)] md:w-1/2">
              <Media
                className="relative w-full"
                imgClassName="aspect-[550/624] h-auto w-full object-cover"
                resource={image}
              />
            </div>
          )}

          <div className="flex w-full flex-col justify-center gap-6 border-t border-glance-divider pt-5 md:w-1/2 md:border-t-0 md:border-l md:pl-[50px] md:pt-0">
            {quote && (
              <blockquote className="font-display text-[40px] leading-none tracking-[-0.04em] text-glance-text">
                {quote}
              </blockquote>
            )}

            {(authorName || authorTitle) && (
              <footer className="flex flex-row flex-wrap items-center gap-2 md:flex-col md:items-start">
                {authorName && (
                  <cite className="font-body text-[15px] font-bold not-italic text-glance-text">
                    {authorName}
                  </cite>
                )}
                {authorTitle && (
                  <p className="font-caption text-[12px] text-glance-primary">{authorTitle}</p>
                )}
              </footer>
            )}
          </div>
        </div>
      </GlanceSection>
    </section>
  )
}
