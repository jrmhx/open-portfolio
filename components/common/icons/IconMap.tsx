import * as LucideIcons from 'lucide-react'
import React from 'react'

import GithubLogo from './customized/GithubLogo'
import TwitterLogo from './customized/TwitterLogo'
import LinkedinLogo from './customized/LinkedinLogo'
import InstagramLogo from './customized/InstagramLogo'
import FacebookLogo from './customized/FacebookLogo'

export const IconMap = {
  // Social Icons
  'github': GithubLogo,
  'linkedin': LinkedinLogo,
  'twitter': TwitterLogo,
  'instagram': InstagramLogo,
  'facebook': FacebookLogo,
  
  // Navigation
  'home': LucideIcons.Home,
  'menu': LucideIcons.Menu,
  'close': LucideIcons.X,
  'arrow-left': LucideIcons.ArrowLeft,
  'arrow-right': LucideIcons.ArrowRight,
  'arrow-up': LucideIcons.ArrowUp,
  'arrow-down': LucideIcons.ArrowDown,
  
  // Actions
  'mail': LucideIcons.Mail,
  'phone': LucideIcons.Phone,
  'external-link': LucideIcons.ExternalLink,
  'download': LucideIcons.Download,
  'upload': LucideIcons.Upload,
  'copy': LucideIcons.Copy,
  'edit': LucideIcons.Edit,
  'delete': LucideIcons.Trash2,
  'search': LucideIcons.Search,
  
  // UI Elements
  'chevron-down': LucideIcons.ChevronDown,
  'chevron-up': LucideIcons.ChevronUp,
  'chevron-left': LucideIcons.ChevronLeft,
  'chevron-right': LucideIcons.ChevronRight,
  'plus': LucideIcons.Plus,
  'minus': LucideIcons.Minus,
  'check': LucideIcons.Check,
  'star': LucideIcons.Star,
  'heart': LucideIcons.Heart,
  
  // Technology/Tools
  'code': LucideIcons.Code,
  'terminal': LucideIcons.Terminal,
  'database': LucideIcons.Database,
  'server': LucideIcons.Server,
  'globe': LucideIcons.Globe,
  'settings': LucideIcons.Settings,
  'tool': LucideIcons.Wrench,
  
  // Files & Documents
  'file': LucideIcons.File,
  'folder': LucideIcons.Folder,
  'document': LucideIcons.FileText,
  'image': LucideIcons.Image,
  
  // User & Profile
  'user': LucideIcons.User,
  'users': LucideIcons.Users,
  'profile': LucideIcons.UserCircle,
  
  // Status & Alerts
  'info': LucideIcons.Info,
  'warning': LucideIcons.AlertTriangle,
  'error': LucideIcons.AlertCircle,
  'success': LucideIcons.CheckCircle,
} as const satisfies Record<string, React.ComponentType<any>>

export type IconMapKey = keyof typeof IconMap