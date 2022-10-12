import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";

import * as Icons from "./Icons";

export default function TipTapEditor({ setContent, value }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const toggleBold = useCallback(() => {
    editor.chain().toggleBold().focus().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().toggleUnderline().focus().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().toggleItalic().focus().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().toggleStrike().focus().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().toggleCode().focus().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <EditorContent editor={editor} />
      <div className="menu">
      
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        {/* <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button> */}
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>

        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
      </div>
    </div>
  );
}
