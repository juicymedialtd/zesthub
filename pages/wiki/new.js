import { useState } from "react";

import TipTapEditor from "../../components/TipTapEditor";

// Set up tiptap
export default function NewEntry() {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  return (
    <div className="mt-8">
      <div className="mt-2 mb-2">
        <input
          type="text"
          name="text"
          id="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Wiki Title"
        />
      </div>
      <TipTapEditor value={text} setContent={setText} />
    </div>
  );
}
