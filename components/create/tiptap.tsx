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
import { RadioGroup } from "@/ui/radio-group"

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
        <div className="flex flex-wrap gap-4 overflow-hidden rounded-t border-t border-l border-r border-raised-border bg-palette-200 p-2 text-sm text-white">
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
    | "id"
    | "title"
    | "content"
    | "issueLink"
    | "bountyPrice"
    | "published"
    | "bountyPriceMax"
    | "bountyPriceMin"
    | "bountyRange"
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
            bountyPriceMax: bounty?.bountyPriceMax ?? undefined,
            bountyPriceMin: bounty?.bountyPriceMin ?? undefined,
            bountyRange: bounty.bountyRange,
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

    const bountyRangeEnabled = methods.watch("bountyRange")

    async function onSubmit(data: FormData) {
        try {
            const editedBounty = await editBounty.mutateAsync({
                issueLink: data.githubIssueLink,
                bountyId: bounty.id,
                bountyPrice: data.bountyPrice,
                bountyRange: data.bountyRange,
                bountyPriceMin: data.bountyPriceMin,
                bountyPriceMax: data.bountyPriceMax,
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
                className="rounded-lg border border-raised-border bg-palette-400"
            >
                <div className="p-4">
                    <div className="grid gap-1">
                        <Input
                            label="Title *"
                            id="title"
                            type="text"
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

                    <div className="my-6 grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid gap-1">
                            <Input
                                label="Github issue link"
                                id="githubIssueLink"
                                className="bg-appbg"
                                placeholder="https://www.github.com/issue..."
                            />
                        </div>
                    </div>
                    <Label>Bounty price*</Label>
                    <div className="mt-2">
                        <RadioGroup
                            defaultValue={
                                bounty.bountyRange ? "range" : "fixed"
                            }
                            onValueChange={(e) => {
                                console.log("Value changed", e)
                                if (e === "fixed") {
                                    methods.setValue("bountyRange", false)
                                } else {
                                    methods.setValue("bountyRange", true)
                                }
                            }}
                        >
                            <RadioGroup.Item id="fixed" value="fixed">
                                Fixed Price
                                <small className="text-sm text-brandtext-700">
                                    A fixed, unchanging price for this bounty.
                                </small>
                            </RadioGroup.Item>
                            <RadioGroup.Item id="range" value="range">
                                Range
                                <small className="text-sm text-brandtext-700">
                                    A price range for this bounty, based on the
                                    quality of the submission you receive.
                                </small>
                            </RadioGroup.Item>
                        </RadioGroup>
                    </div>

                    {!bountyRangeEnabled && (
                        <div className="mt-4 mb-4 grid grid-cols-2 gap-4">
                            <Input
                                step="0.01"
                                label="Bounty price *"
                                id="bountyPrice"
                                type="number"
                                placeholder="10.00"
                                className="bg-appbg"
                                aria-describedby="bountyPrice"
                            >
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span
                                        className="text-gray-500 sm:text-sm"
                                        id="price-currency"
                                    >
                                        USD
                                    </span>
                                </div>
                            </Input>
                        </div>
                    )}
                    {bountyRangeEnabled && (
                        <div className="mt-4 mb-4 grid grid-cols-2 gap-4">
                            <Input
                                step="0.01"
                                label="Bounty price minimum *"
                                id="bountyPriceMin"
                                type="number"
                                placeholder="1.00"
                                className="bg-appbg"
                                aria-describedby="bountyPriceMin"
                            >
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span
                                        className="text-gray-500 sm:text-sm"
                                        id="price-currency"
                                    >
                                        USD
                                    </span>
                                </div>
                            </Input>
                            <Input
                                step="0.01"
                                label="Bounty price maximum *"
                                id="bountyPriceMax"
                                type="number"
                                placeholder="100.00"
                                className="bg-appbg"
                                aria-describedby="bountyPriceMax"
                            >
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span
                                        className="text-gray-500 sm:text-sm"
                                        id="price-currency"
                                    >
                                        USD
                                    </span>
                                </div>
                            </Input>
                        </div>
                    )}

                    <Label className="dropdown my-4 block" htmlFor="details">
                        Bounty Details
                    </Label>
                    <div className="mt-1">
                        <MenuBar editor={editor} />
                        {editor && (
                            <BubbleMenu
                                className="dropdown dropdown flex gap-4 overflow-hidden rounded-lg p-2 px-3 py-1 text-sm text-white"
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
                    <small className="mt-4 flex items-center gap-2 text-brandtext-600">
                        <Icons.markdown size={16} />
                        Styling with Markdown supported
                    </small>
                </div>
                <div className="mt-8 flex w-full justify-end gap-4 border-t border-raised-border p-4">
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
