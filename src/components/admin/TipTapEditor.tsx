'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { 
  Bold, Italic, List, ListOrdered, Quote, Minus, Link as LinkIcon, 
  Heading2, Heading3, Undo, Redo, Image as ImageIcon
} from 'lucide-react'

export default function TipTapEditor({ 
  content, 
  onChange 
}: { 
  content: string
  onChange: (html: string) => void 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none max-w-none min-h-[400px] p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImage = () => {
    const url = window.prompt('Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border border-gray-300 rounded-[2px] overflow-hidden bg-white">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('blockquote') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Quote"
        >
          <Quote size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('link') ? 'bg-gray-200 text-forest-800' : 'text-gray-600'}`}
          title="Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
          title="Image"
        >
          <ImageIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
          title="Horizontal Rule"
        >
          <Minus size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
