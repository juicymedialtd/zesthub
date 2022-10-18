import { useState } from "react";

import TipTapEditor from "../../components/TipTapEditor";

// Ability to save Document
// Set if public
// if admin - set homepage

export default function NewEntry() {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  return (
    <div className="mt-8 px-8">
      <div></div>
      <div className="mt-2 mb-2">
        <label htmlFor="email" className="block text-sm font-bold text-white">
          Title
        </label>
        <input
          type="text"
          name="text"
          id="text"
          className="block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Wiki Title"
        />
      </div>
      <TipTapEditor value={text} setContent={setText} />
      <div className="float-right">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-secondary px-3.5 py-2.5 text-sm font-medium leading-4 text-gray-900 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Document
        </button>
      </div>
    </div>
  );
}
