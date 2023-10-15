import React from "react"
import {
  isTextSelection,
  BubbleMenu as TiptapBubbleMenu,
  type Editor,
} from "@tiptap/react"

import { Icons, type IconType } from "@/components/@ui/icons"
import { Toggle } from "@/components/@ui/toggle"

type BubbleMenuProps = {
  editor: Editor | null
}

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) {
    return null
  }

  const bubbleMenus = [
    {
      name: "headingOne",
      Icon: Icons.HeadingOne,
      isActive: () => editor.isActive("heading", { level: 1 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: "headingTwo",
      Icon: Icons.HeadingTwo,
      isActive: () => editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "headingThree",
      Icon: Icons.HeadingThree,
      isActive: () => editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: "bold",
      Icon: Icons.Bold,
      isActive: () => editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      Icon: Icons.Italic,
      isActive: () => editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "underline",
      Icon: Icons.UnderLine,
      isActive: () => editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      name: "strike",
      Icon: Icons.Strike,
      isActive: () => editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      name: "code",
      Icon: Icons.InlineCode,
      isActive: () => editor.isActive("code"),
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      name: "link",
      Icon: Icons.Link,
      isActive: () => editor.isActive("link"),
      onClick: () => {
        const previousUrl = editor.getAttributes("link").href

        if (previousUrl) {
          return editor.chain().focus().toggleLink({ href: previousUrl }).run()
        }

        const url = window.prompt("URL을 입력해주세요.")

        if (!url) {
          return
        }

        editor.chain().focus().toggleLink({ href: url }).run()
      },
    },
  ]

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ maxWidth: 350, duration: 100 }}
      shouldShow={({ editor, view, state, oldState, from, to }) => {
        const { doc, selection } = state
        const { empty } = selection

        // Sometime check for `empty` is not enough.
        // Doubleclick an empty paragraph returns a node size of 2.
        // So we check also for an empty text size.
        const isEmptyTextBlock =
          !doc.textBetween(from, to).length && isTextSelection(state.selection)

        // When clicking on a element inside the bubble menu the editor "blur" event
        // is called and the bubble menu item is focussed. In this case we should
        // consider the menu as part of the editor and keep showing the menu
        const isChildOfMenu = editor.options.element.contains(
          document.activeElement
        )

        const hasEditorFocus = view.hasFocus() || isChildOfMenu

        if (
          !hasEditorFocus ||
          empty ||
          isEmptyTextBlock ||
          editor.isEditable ||
          editor.isActive("image")
        ) {
          return false
        }

        return true
      }}
    >
      <ul className="flex items-center gap-0.5 rounded-md bg-foreground p-1 text-background shadow-xl">
        {bubbleMenus.map((menu) => (
          <li key={menu.name}>
            <BubbleMenuToggle
              Icon={menu.Icon}
              isActive={menu.isActive()}
              onClick={menu.onClick}
            />
          </li>
        ))}
      </ul>
    </TiptapBubbleMenu>
  )
}

type BubbleMenuToggleProps = {
  Icon: IconType
  isActive: boolean
  onClick: () => void
}

const BubbleMenuToggle = ({
  Icon,
  isActive,
  onClick,
}: BubbleMenuToggleProps) => {
  return (
    <Toggle size="xs" radius="full" onClick={onClick} pressed={isActive}>
      <Icon className="h-4 w-4" />
    </Toggle>
  )
}
