"use client"

import { trpc } from "@/client/trpcClient"
import { cn } from "@/lib/utils"
import { bountyPatchSchema } from "@/lib/validations/bounty"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { toast } from "@/ui/toast"
import { ToggleGroup } from "@/ui/toggle-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bounty, BountyType } from "@prisma/client"
import Placeholder from "@tiptap/extension-placeholder"
import {
    BubbleMenu,
    Content,
    Editor,
    EditorContent,
    useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "../icons"
import { useState } from "react"

type ButtonProps = ComponentProps<"button">

interface TToolbarButton extends ButtonProps {
    children: React.ReactNode
    isActive?: boolean
}

const ToolbarButton = ({ children, isActive, ...props }: TToolbarButton) => {
    return (
        <button
            type="button"
            className={cn(isActive ? "text-rose-500" : "")}
            {...props}
        >
            {children}
        </button>
    )
}

type BountyTypeToggle = {
    value: BountyType
    label: string
}

const TypeToggleItems: BountyTypeToggle[] = [
    {
        value: BountyType.BUG,
        label: "Bug",
    },
    {
        value: BountyType.PROJECT,
        label: "Project",
    },
    {
        value: BountyType.FEATURE,
        label: "Feature",
    },
    {
        value: BountyType.IMPROVEMENT,
        label: "Improvement",
    },
    {
        value: BountyType.DESIGN,
        label: "Design",
    },
    {
        value: BountyType.DOCS,
        label: "Docs",
    },
    {
        value: BountyType.SUPPORT,
        label: "Support",
    },
    {
        value: BountyType.OTHER,
        label: "Other",
    },
]

type TMenuBar = {
    editor: Editor | null
}
const MenuBar = ({ editor }: TMenuBar) => {
    if (!editor) {
        return null
    }

    return (
        <div className="text-white flex flex-wrap rounded-t border-t border-raised-border overflow-hidden border-l border-r p-2 gap-4 text-sm bg-palette-200">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
            >
                <Icons.bold size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
            >
                <Icons.italic size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                isActive={editor.isActive("strike")}
            >
                <Icons.strikeThrough size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                isActive={editor.isActive("code")}
            >
                <Icons.curlyBraces size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("paragraph")}
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                <Icons.paragraph size={16} />
            </ToolbarButton>
            <ToolbarButton
                isActive={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                h1
            </ToolbarButton>
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor.isActive("heading", { level: 2 })}
            >
                h2
            </ToolbarButton>
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={editor.isActive("heading", { level: 3 })}
            >
                h3
            </ToolbarButton>
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                isActive={editor.isActive("heading", { level: 4 })}
            >
                h4
            </ToolbarButton>
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                isActive={editor.isActive("heading", { level: 5 })}
            >
                h5
            </ToolbarButton>
            <ToolbarButton
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                isActive={editor.isActive("heading", { level: 6 })}
            >
                h6
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
            >
                <Icons.list size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
            >
                <Icons.orderedList size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive("codeBlock")}
            >
                <Icons.code size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive("blockquote")}
            >
                <Icons.quote size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Icons.separator size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >
                <Icons.wrapText size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Icons.undo size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Icons.redo size={16} />
            </ToolbarButton>
        </div>
    )
}

type TBounty = Pick<
    Bounty,
    "id" | "title" | "content" | "issueLink" | "bountyPrice" | "published"
> & {
    issue?: any
}
interface TTipTap {
    bounty: TBounty
}

type FormData = z.infer<typeof bountyPatchSchema>

const Tiptap = ({ bounty }: TTipTap) => {
    const [bountyType, setBountyType] = useState<BountyType>(BountyType.BUG)

    const editBounty = trpc.bounty.editBounty.useMutation()

    const router = useRouter()

    const methods = useForm<FormData>({
        resolver: zodResolver(bountyPatchSchema),
        defaultValues: {
            title: bounty?.title,
            githubIssueLink: bounty?.issueLink ?? "",
            bountyPrice: bounty?.bountyPrice ?? undefined,
        },
    })

    const editor = useEditor({
        content: bounty?.content ? (bounty.content as Content) : null,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder:
                    "Give bounty hunters more context to the issue you are trying to solve...",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-invert focus:outline-none bg-appbg border-palette-300 placeholder:text-placeholder hover:border-slate-600 text-white focus:border-rose-500 w-full rounded-md rounded-t-none border py-2 px-3 min-h-[300px]",
            },
        },
    })

    async function onSubmit(data: FormData) {
        if (!data.bountyPrice) {
            return toast({
                title: "Bounty price required",
                message: "Please enter a bounty price greater than 0",
                type: "error",
            })
        }

        try {
            const editedBounty = await editBounty.mutateAsync({
                issueLink: data.githubIssueLink,
                bountyId: bounty.id,
                bountyPrice: data.bountyPrice,
                title: data.title,
                content: editor?.getJSON(),
                html: editor?.getHTML(),
                type: bountyType,
            })

            toast({
                message: "Your bounty has been saved.",
                type: "success",
            })

            router.refresh()

            router.push(`/bounty/${editedBounty.id}`)
        } catch (e) {
            return toast({
                title: "Something went wrong.",
                message: "Your bounty was not saved. Please try again.",
                type: "error",
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="border border-raised-border rounded-lg bg-palette-400"
            >
                <div className="p-4">
                    <div className="grid gap-1">
                        <Input
                            label="Title *"
                            id="title"
                            className="bg-appbg"
                            placeholder="Enter a title for your Bounty"
                        />
                    </div>
                    <div className="mt-6 flex flex-col items-start">
                        <Label>Type *</Label>
                        <small className="text-brandtext-700">
                            Selecting the right bounty type will help users
                            discover your bounty
                        </small>
                        <div className="mt-4">
                            <ToggleGroup
                                onValueChange={(e: BountyType) =>
                                    setBountyType(e)
                                }
                                defaultValue={BountyType.BUG}
                                type="single"
                            >
                                {TypeToggleItems.map((typeItem) => (
                                    <ToggleGroup.Item
                                        key={typeItem.label}
                                        value={typeItem.value}
                                    >
                                        {typeItem.label}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-6">
                        <div className="grid gap-1">
                            <Input
                                label="Github issue link"
                                id="githubIssueLink"
                                className="bg-appbg"
                                placeholder="https://www.github.com/issue..."
                            />
                        </div>
                        <div className="grid gap-1">
                            <Input
                                step="0.01"
                                label="Bounty price *"
                                id="bountyPrice"
                                type="number"
                                placeholder="0.00"
                                className="bg-appbg"
                                aria-describedby="bountyPrice"
                            />
                        </div>
                    </div>

                    <Label className="dropdown mb-4" htmlFor="details">
                        Bounty Details
                    </Label>
                    <div className="mt-1">
                        <MenuBar editor={editor} />
                        {editor && (
                            <BubbleMenu
                                className="dropdown text-white rounded-lg overflow-hidden p-2 px-3 py-1 text-sm flex gap-4 dropdown"
                                editor={editor}
                                tippyOptions={{ duration: 100 }}
                            >
                                <button
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }
                                    className={
                                        editor.isActive("bold")
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    bold
                                </button>
                                <button
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleItalic()
                                            .run()
                                    }
                                    className={
                                        editor.isActive("italic")
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    italic
                                </button>
                                <button
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleStrike()
                                            .run()
                                    }
                                    className={
                                        editor.isActive("strike")
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    strike
                                </button>
                            </BubbleMenu>
                        )}
                        <EditorContent editor={editor} />
                    </div>
                    <small className="text-brandtext-600 mt-4 flex items-center gap-2">
                        <Icons.markdown size={16} />
                        Styling with Markdown supported
                    </small>
                </div>
                <div className="flex w-full justify-end gap-4 mt-8 border-t p-4 border-raised-border">
                    <Button
                        type="submit"
                        disabled={editBounty.isLoading || editBounty.isSuccess}
                    >
                        {editBounty.isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.edit className="mr-2 h-4 w-4" />
                        )}
                        {bounty.published ? "Save" : "Save and Publish"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default Tiptap
