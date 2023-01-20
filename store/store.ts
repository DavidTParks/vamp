import { GithubIssue } from "@/types"
import { create } from "zustand"

interface IssueSelectStore {
    selectedIssues: GithubIssue[]
    selectIssue: (issue: GithubIssue) => void
    removeIssue: (issue: GithubIssue) => void
}

export const useStore = create<IssueSelectStore>((set) => ({
    selectedIssues: [],
    selectIssue: (issue: GithubIssue) => {
        set((state) => ({
            selectedIssues: [...state.selectedIssues, issue],
        }))
    },
    removeIssue: (issue: GithubIssue) => {
        set((state) => ({
            selectedIssues: state.selectedIssues.filter(
                (selectedIssue) => selectedIssue.id !== issue.id
            ),
        }))
    },
}))
