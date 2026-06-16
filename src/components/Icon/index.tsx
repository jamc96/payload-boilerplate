import { BarChart, Cable, Earth, User, type LucideProps } from 'lucide-react'
import React from 'react'

import type { IconPickerValue } from '@/fields/iconPicker'
import { cn } from '@/utilities/ui'

const iconMap: Record<IconPickerValue, React.FC<LucideProps>> = {
  cable: Cable,
  earth: Earth,
  user: User,
  barChart: BarChart,
}

type IconProps = {
  name?: IconPickerValue | string | null
  className?: string
} & Omit<LucideProps, 'ref'>

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  if (!name || !(name in iconMap)) {
    return null
  }

  const IconComponent = iconMap[name as IconPickerValue]

  return <IconComponent aria-hidden className={cn('size-6', className)} {...props} />
}
