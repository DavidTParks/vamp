"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Text from "@tiptap/extension-text"
import { Input } from "@/ui/input"
import { useForm } from "react-hook-form"
import { Bounty } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { bountyPatchSchema } from "@/lib/validations/bounty"
import { z } from "zod"
import { Label } from "@/ui/label"
import { Icons } from "../icons"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type ButtonProps = ComponentProps<"button">

interface TToolbarButton extends ButtonProps {
    children: React.ReactNode
    isActive?: boolean
}

const ToolbarButton = ({ children, isActive, ...props }: TToolbarButton) => {
    return (
        <button className={cn(isActive ? "text-fuchsia-500" : "")} {...props}>
            {children}
        </button>
    )
}

const MenuBar = ({ editor }) => {
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

type TBounty = Pick<Bounty, "id" | "title" | "content">
interface TTipTap {
    bounty: TBounty
}

type FormData = z.infer<typeof bountyPatchSchema>

const Tiptap = ({ bounty }: TTipTap) => {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(bountyPatchSchema),
        defaultValues: {
            title: bounty.title,
        },
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Placeholder.configure({
                placeholder:
                    "Give bounty hunters more context to the issue you are trying to solve...",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-invert focus:outline-none bg-appbg border-palette-300 placeholder:text-placeholder hover:border-slate-600 text-white focus:border-fuchsia-500 w-full rounded-md rounded-t-none border py-2 px-3 min-h-[300px]",
            },
        },
    })

    return (
        <div className="border border-raised-border rounded-lg p-4 bg-palette-400">
            <div className="grid gap-1">
                <Label className="dropdown" htmlFor="title">
                    Title
                </Label>
                <Input
                    className="bg-appbg"
                    name="title"
                    placeholder="Enter a title for your Bounty"
                    register={register}
                />
            </div>
            <div className="grid gap-1 mt-4">
                <Label className="dropdown" htmlFor="title">
                    Github Issue link
                </Label>
                <Input
                    className="bg-appbg"
                    name="githubLink"
                    placeholder="Enter a title for your Bounty"
                    register={register}
                />
            </div>

            <div className="mt-4">
                <MenuBar editor={editor} />
                {editor && (
                    <BubbleMenu
                        className="dropdown text-white rounded-lg overflow-hidden p-2 px-3 py-1 text-sm flex gap-4 dropdown"
                        editor={editor}
                        tippyOptions={{ duration: 100 }}
                    >
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            className={
                                editor.isActive("bold") ? "is-active" : ""
                            }
                        >
                            bold
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            className={
                                editor.isActive("italic") ? "is-active" : ""
                            }
                        >
                            italic
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            className={
                                editor.isActive("strike") ? "is-active" : ""
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
            <div className="grid grid-cols-2 mt-6 gap-4">
                <div className="grid gap-1">
                    <Label className="dropdown" htmlFor="title">
                        Bounty reward
                    </Label>
                    <Input
                        className="bg-appbg"
                        name="number"
                        placeholder="$50.00"
                        register={register}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tiptap
