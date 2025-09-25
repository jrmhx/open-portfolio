import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import { IconMap, type IconMapKey } from './IconMap'

const iconVariants = cva(
  "inline-flex shrink-0",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4", 
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
        "2xl": "w-10 h-10"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
)

interface IconProps extends VariantProps<typeof iconVariants> {
  name: IconMapKey | keyof typeof LucideIcons
  className?: string
  [key: string]: any // For any other lucide icon props like strokeWidth, color, etc. 
}

// Helper function to safely get icon from map
const getIconFromMap = (name: string): React.ComponentType<any> | null => {
  if (name in IconMap) {
    return IconMap[name as IconMapKey] as React.ComponentType<any>
  }
  return LucideIcons.Link2 // fall back to lucide link2
}

export const IconFactory: React.FC<IconProps> = ({ 
  name, 
  className, 
  size,
  ...props 
}) => {
  // First try the IconMap for string-based icons
  const MappedIcon = getIconFromMap(name)
  if (MappedIcon) {
    return (
      <MappedIcon
        className={cn(iconVariants({ size }), className)}
        {...props}
      />
    )
  }

  // Fallback to direct Lucide icon access
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<any>
  if (LucideIcon) {
    return (
      <LucideIcon
        className={cn(iconVariants({ size }), className)}
        {...props}
      />
    )
  }

  console.warn(`Icon "${String(name)}" not found in IconMap or Lucide icons`)
  return null
}
