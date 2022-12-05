import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Command,
    CreditCard,
    File,
    FileText,
    Github,
    HelpCircle,
    Image,
    Loader2,
    MoreVertical,
    Pizza,
    Plus,
    Settings,
    Trash,
    Twitter,
    ChevronLast,
    User,
    Star,
    Edit,
    X,
    CircleDot,
} from "lucide-react"

import { GiVampireDracula as Dracula } from "react-icons/gi"

import { GiBat as Bat } from "react-icons/gi"

import type { Icon as LucideIcon } from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
    circleDot: CircleDot,
    edit: Edit,
    logo: Bat,
    close: X,
    spinner: Loader2,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    gitHub: Github,
    twitter: Twitter,
    check: Check,
    star: Star,
    activity: Activity,
}
