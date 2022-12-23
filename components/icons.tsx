import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Command,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Loader2,
    MoreVertical,
    Search,
    Pizza,
    Plus,
    Settings,
    Trash,
    Twitter,
    Link,
    ChevronLast,
    Edit2,
    User,
    Star,
    Edit,
    X,
    Aperture,
    CircleDot,
    Bold,
    Italic,
    Strikethrough,
    Code,
    Pilcrow,
    List,
    Frown,
    ListOrdered,
    CurlyBraces,
    Quote,
    SeparatorHorizontal,
    WrapText,
    Undo2,
    Redo2,
    Share,
    CheckCircle,
    Menu,
    Verified,
    SortAsc,
    SortDesc,
} from "lucide-react"

import { GiVampireDracula as Dracula } from "react-icons/gi"

import { GiBat as Bat, GiFangs } from "react-icons/gi"

import { FaMarkdown, FaGithub } from "react-icons/fa"

import type { Icon as LucideIcon } from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
    sortAsc: SortAsc,
    sortDesc: SortDesc,
    fangs: GiFangs,
    share: Share,
    frown: Frown,
    redo: Redo2,
    undo: Undo2,
    wrapText: WrapText,
    separator: SeparatorHorizontal,
    quote: Quote,
    curlyBraces: CurlyBraces,
    orderedList: ListOrdered,
    list: List,
    paragraph: Pilcrow,
    code: Code,
    strikeThrough: Strikethrough,
    bold: Bold,
    italic: Italic,
    active: Aperture,
    circleDot: CircleDot,
    edit: Edit,
    edit2: File,
    logo: Bat,
    close: X,
    search: Search,
    spinner: Loader2,
    chevronUp: ChevronUp,
    chevronDown: ChevronDown,
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
    markdown: FaMarkdown,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    gitHub: FaGithub,
    twitter: Twitter,
    check: CheckCircle,
    star: Star,
    activity: Activity,
    link: Link,
    menu: Menu,
    verified: Verified,
}
