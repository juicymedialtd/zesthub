import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

export default function FeedbackModel() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function postFeedback() {
    await fetch("/api/v1/feedback/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSubmitted(true);
        }
      });
  }

  function handleAfter(e) {
    setText("");
    if (e === "close") {
      setOpen(false);
    } else {
        setSubmitted(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded border border-gray-300 bg-topnav-bg px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1"
      >
        Feedback
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-end p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white w-3/4 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:mt-3 sm:mr-4 sm:w-full sm:max-w-md sm:p-6">
                  <div>
                    <div className="text-sm font-bold">FEEDBACK</div>

                    <div>
                      {!submitted && (
                        <div className="flex items-start space-x-4">
                          <div className="min-w-0 flex-1">
                            <form action="#" className="relative">
                              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-main-bg focus-within:ring-1 focus-within:ring-main-bg">
                                <label htmlFor="comment" className="sr-only">
                                  Add your comment
                                </label>
                                <textarea
                                  rows={2}
                                  name="comment"
                                  id="comment"
                                  className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                                  placeholder="Add your comment and click save to submit..."
                                  onChange={(e) => setText(e.target.value)}
                                />

                                {/* Spacer element to match the height of the toolbar */}
                                <div className="py-2" aria-hidden="true">
                                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                  <div className="py-px">
                                    <div className="h-9" />
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                                {/* <div className="flex items-center space-x-5">
                                 <div className="flex items-center">
                                   <button
                                     type="button"
                                     className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                   >
                                     <PaperClipIcon
                                       className="h-5 w-5"
                                       aria-hidden="true"
                                     />
                                     <span className="sr-only">
                                       Attach a file
                                     </span>
                                   </button>
                                 </div>
                               
                               </div> */}
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    className="inline-flex float-right rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                                    onClick={() => postFeedback()}
                                  >
                                    save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                      {submitted && (
                        <>
                          <div className="mt-2">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon
                                className="h-6 w-6 text-green-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Feedback Submitted
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Thank you for submitting your feedback, a
                                  member of our team will be taking a look
                                  shortly.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 flex flex-row gap-8">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              onClick={() => handleAfter("close")}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-main-bg px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              onClick={() => handleAfter("again")}
                            >
                              submit again
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
