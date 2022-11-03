import { useState, useRef, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { FolderIcon, HashtagIcon, TagIcon } from "@heroicons/react/outline";

const quickActions = [
  {
    name: "Request Leave",
    icon: FolderIcon,
    shortcut: "F",
    url: "/holidays/new",
  },
  { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
  { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShortCut() {
  const [query, setQuery] = useState("");

  const filteredProjects =
    query === ""
      ? []
      : quickActions.filter((action) => {
          return action.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className="flex flex-1 justify-start p-2 mt-1 lg:ml-6">
        <div className="w-full md:max-w-xl">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox value={query}>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>

                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 overflow-y-auto"
                  >
                    <li className="">
                      <ul className="text-sm text-gray-700">
                        {filteredProjects.map((project) => (
                          <Combobox.Option
                            key={project.id}
                            value={project}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                active && "bg-indigo-600 text-white"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <FolderIcon
                                  className={classNames(
                                    "h-6 w-6 flex-none",
                                    active ? "text-white" : "text-gray-400"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {project.name}
                                </span>
                                {active && (
                                  <span className="ml-3 flex-none text-indigo-100">
                                    Jump to...
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </ul>
                    </li>
                    {query === "" && (
                      <li className="p-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-700">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                  active && "bg-gray-200"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={classNames("h-6 w-6 flex-none")}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {action.name}
                                  </span>
                                  <span
                                    className={classNames(
                                      "text-xs font-semibold bg-transparent"
                                    )}
                                  >
                                    <kbd className="font-sans bg-transparent">
                                      {action.shortcut}
                                    </kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" && filteredProjects.length === 0 && (
                  <div className="py-14 px-6 text-center sm:px-14">
                    <FolderIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      We couldn't find any actions with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
