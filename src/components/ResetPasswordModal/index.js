import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

export default function ResetPasswordModal() {
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState(false)

  async function invite() {
    if (password === confirm) {
      await fetch("/api/v1/auth/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirm,
        }),
      }).then(() => {
        signOut();
      });
    } else {
        setError(true)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-white hover:text-[#FED929]"
      >
        Reset Password
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Reset your password
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        As a warning, you will be logged out once you click
                        confirm.
                      </p>
                    </div>
                    <div className="mt-5 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="text-sm">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="text-sm">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setConfirm(e.target.value)}
                        />
                      </div>
                    </div>
                    {error && <span className="text-sm text-red-600">Passwords do not match</span>}
                    <div className="mt-4 float-right">
                      <button
                        type="button"
                        onClick={() => invite()}
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-medium text-white shadow-sm hover:bg-secondary  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
