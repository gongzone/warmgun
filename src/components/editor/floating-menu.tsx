import { useRef } from "react"
import { FloatingMenu as TiptapFloatingMenu, type Editor } from "@tiptap/react"

import { HiddenFileInput } from "@/components/@ui/hidden-file-input"
import { Icons, type IconType } from "@/components/@ui/icons"
import { Toggle } from "@/components/@ui/toggle"

type FloatingMenuProps = {
  editor: Editor
}

export const FloatingMenu = ({ editor }: FloatingMenuProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const floatingMenus = [
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
      name: "image",
      Icon: Icons.Image,
      isActive: () => editor.isActive("image"),
      onClick: () => fileRef.current?.click(),
    },
    {
      name: "bulletList",
      Icon: Icons.ListUnordered,
      isActive: () => editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "blockquote",
      Icon: Icons.Quote,
      isActive: () => editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      name: "codeBlock",
      Icon: Icons.CodeBox,
      isActive: () => editor.isActive("codeBlock"),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
  ]

  return (
    <>
      <TiptapFloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <ul className="flex items-center gap-1">
          {floatingMenus.map((menu) => (
            <li key={menu.name}>
              <FloatingMenuToggle
                Icon={menu.Icon}
                isActive={menu.isActive()}
                onClick={menu.onClick}
              />
            </li>
          ))}
        </ul>
      </TiptapFloatingMenu>
      <HiddenFileInput ref={fileRef} />
    </>
  )
}

type FloatingMenuToggleProps = {
  Icon: IconType
  isActive: boolean
  onClick: () => void
}

const FloatingMenuToggle = ({
  Icon,
  isActive,
  onClick,
}: FloatingMenuToggleProps) => {
  return (
    <Toggle
      variant="outline"
      size="sm"
      radius="full"
      onClick={onClick}
      pressed={isActive}
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  )
}
