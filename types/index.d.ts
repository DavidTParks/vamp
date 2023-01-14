import { Icons } from "@/components/icons"
import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

export type Await<T> = T extends PromiseLike<infer U> ? U : T
export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
    | {
          href: string
          items?: never
      }
    | {
          href?: string
          items: NavLink[]
      }
)

export type SiteConfig = {
    name: string
    links: {
        twitter: string
        github: string
    }
}

export type DocsConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
    mainNav: MainNavItem[]
}

export type DashboardConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
}

export type SettingsConfig = {
    sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
    name: string
    description: string
    stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
        stripeCurrentPeriodEnd: number
        isPro: boolean
    }

export interface GithubRepository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: Owner
    html_url: string
    description?: null
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
    created_at: string
    updated_at: string
    pushed_at: string
    git_url: string
    ssh_url: string
    clone_url: string
    svn_url: string
    homepage?: null
    size: number
    stargazers_count: number
    watchers_count: number
    language: string
    has_issues: boolean
    has_projects: boolean
    has_downloads: boolean
    has_wiki: boolean
    has_pages: boolean
    has_discussions: boolean
    forks_count: number
    mirror_url?: null
    archived: boolean
    disabled: boolean
    open_issues_count: number
    license?: null
    allow_forking: boolean
    is_template: boolean
    web_commit_signoff_required: boolean
    topics?: null[] | null
    visibility: string
    forks: number
    open_issues: number
    watchers: number
    default_branch: string
    permissions: Permissions
}
export interface Owner {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
}
export interface Permissions {
    admin: boolean
    maintain: boolean
    push: boolean
    triage: boolean
    pull: boolean
}

export interface GithubUser {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string
    company: any
    blog: string
    location: any
    email: string
    hireable: boolean
    bio: any
    twitter_username: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    private_gists: number
    total_private_repos: number
    owned_private_repos: number
    disk_usage: number
    collaborators: number
    two_factor_authentication: boolean
    plan: Plan
}

export interface Plan {
    name: string
    space: number
    collaborators: number
    private_repos: number
}

export interface GithubIssue {
    url: string
    repository_url: string
    labels_url: string
    comments_url: string
    events_url: string
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: GithubUser
    labels: any[]
    state: string
    locked: boolean
    assignee: any
    assignees: any[]
    milestone: any
    comments: number
    created_at: string
    updated_at: string
    closed_at: any
    author_association: string
    active_lock_reason: any
    body: string
    reactions: Reactions
    timeline_url: string
    performed_via_github_app: any
    state_reason: any
}

export interface GithubUser {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
}

export interface Reactions {
    url: string
    total_count: number
    "+1": number
    "-1": number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
}

export interface GithubIssueSearch {
    total_count: number
    incomplete_results: boolean
    items: GithubIssue[]
}

export interface GithubOrg {
    login: string
    id: number
    node_id: string
    url: string
    repos_url: string
    events_url: string
    hooks_url: string
    issues_url: string
    members_url: string
    public_members_url: string
    avatar_url: string
    description: string
}
