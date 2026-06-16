import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { CtaAppearances } from '@/fields/ctaButton'
import { cn } from '@/utilities/ui'

import type { Page, Post } from '@/payload-types'

type GlanceButtonProps = {
  appearance?: CtaAppearances | null
  className?: string
  fullWidth?: boolean | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

const appearanceClasses: Record<CtaAppearances, string> = {
  primary:
    'bg-glance-primary text-glance-on-primary hover:bg-glance-primary/90 focus-visible:ring-glance-primary/30',
  secondary:
    'bg-glance-primary-light text-glance-text hover:bg-glance-primary-light/90 focus-visible:ring-glance-primary/20',
  linkout:
    'bg-glance-primary text-glance-on-primary hover:bg-glance-primary/90 focus-visible:ring-glance-primary/30',
}

const resolveHref = (props: GlanceButtonProps): string | null => {
  const { reference, type, url } = props

  if (type === 'reference' && reference?.value && typeof reference.value === 'object') {
    const slug = reference.value.slug

    if (!slug) {
      return null
    }

    if (slug === 'home') {
      return '/'
    }

    return reference.relationTo !== 'pages' ? `/${reference.relationTo}/${slug}` : `/${slug}`
  }

  return url || null
}

export const GlanceButton: React.FC<GlanceButtonProps> = (props) => {
  const {
    appearance = 'primary',
    className,
    fullWidth,
    label,
    newTab,
  } = props

  const href = resolveHref(props)

  if (!href || !label) {
    return null
  }

  const resolvedAppearance: CtaAppearances = appearance ?? 'primary'
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const showArrow = resolvedAppearance === 'linkout'

  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-0.5 rounded-[1000px] px-[22px] py-[14px] font-body text-[14px] font-bold tracking-[-0.35px] transition-colors focus-visible:outline-none focus-visible:ring-4',
        appearanceClasses[resolvedAppearance],
        fullWidth && 'w-full',
        className,
      )}
      href={href}
      {...newTabProps}
    >
      <span>{label}</span>
      {showArrow && <ArrowUpRight aria-hidden className="size-1.5 shrink-0" />}
    </Link>
  )
}
