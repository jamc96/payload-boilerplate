import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  authorName,
  authorTitle,
  image,
  quote,
}) => {
  return (
    <section
      className="bg-glance-bg py-[var(--glance-section-padding-y)] lg:py-[var(--glance-section-padding-y-lg)]"
      data-testid="block-testimonial"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col gap-[var(--glance-column-gap)] md:flex-row md:items-center">
          {image && typeof image === 'object' && (
            <div className="w-full shrink-0 overflow-hidden rounded-[var(--glance-radius-image)] md:w-1/2">
              <Media
                className="relative w-full"
                imgClassName="aspect-square h-auto w-full object-cover"
                resource={image}
              />
            </div>
          )}

          <div className="flex w-full flex-col gap-6 md:w-1/2">
            {quote && (
              <blockquote className="font-display text-[40px] leading-[1.1] text-glance-text">
                {quote}
              </blockquote>
            )}

            {(authorName || authorTitle) && (
              <footer className="flex flex-col gap-1">
                {authorName && (
                  <cite className="font-body text-[15px] font-bold not-italic text-glance-text">
                    {authorName}
                  </cite>
                )}
                {authorTitle && (
                  <p className="font-body text-[15px] text-glance-muted">{authorTitle}</p>
                )}
              </footer>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
