import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();

  async function postData() {
    const formData = new FormData();

    formData.append("photo", photo[0]);
    formData.append("email", email ? email : session.data.user.email);

    await fetch("/api/v1/user/update", {
      method: "post",
      body: formData,
    }).then(() => router.reload());

  }


  return (
    <div className="bg-white rounded-md p-[2rem]">
      <div className="space-y-8">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={session.data.user.email}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("myFileInput").click();
                    }}
                    className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                  {photo !== undefined && (
                      <span className="text-sm ml-4">{photo[0].name}</span>
                  )}
                  <input
                    type="file"
                    id="myFileInput"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files)}
                    accept="image/gif, image/jpeg, image/png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/*<div className="pt-8">*/}
          {/*  <div>*/}
          {/*    <h3 className="text-lg font-medium leading-6 text-gray-900">*/}
          {/*      Notifications*/}
          {/*    </h3>*/}
          {/*    <p className="mt-1 text-sm text-gray-500">*/}
          {/*      We'll always let you know about important updates, but here you*/}
          {/*      can pick what else you want to hear about.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*  <div className="mt-6">*/}
          {/*    <fieldset>*/}
          {/*      <legend className="sr-only">By Email</legend>*/}
          {/*      <div*/}
          {/*        className="text-base font-medium text-gray-900"*/}
          {/*        aria-hidden="true"*/}
          {/*      >*/}
          {/*        By Email*/}
          {/*      </div>*/}
          {/*      <div className="mt-4 space-y-4">*/}
          {/*        <div className="relative flex items-start">*/}
          {/*          <div className="flex h-5 items-center">*/}
          {/*            <input*/}
          {/*              id="comments"*/}
          {/*              name="comments"*/}
          {/*              type="checkbox"*/}
          {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*          <div className="ml-3 text-sm">*/}
          {/*            <label*/}
          {/*              htmlFor="comments"*/}
          {/*              className="font-medium text-gray-700"*/}
          {/*            >*/}
          {/*              Holidays*/}
          {/*            </label>*/}
          {/*            <p className="text-gray-500">*/}
          {/*              Get notified when an admin approves a holiday request*/}
          {/*            </p>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="relative flex items-start">*/}
          {/*          <div className="flex h-5 items-center">*/}
          {/*            <input*/}
          {/*              id="candidates"*/}
          {/*              name="candidates"*/}
          {/*              type="checkbox"*/}
          {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*          <div className="ml-3 text-sm">*/}
          {/*            <label*/}
          {/*              htmlFor="candidates"*/}
          {/*              className="font-medium text-gray-700"*/}
          {/*            >*/}
          {/*              Milage*/}
          {/*            </label>*/}
          {/*            <p className="text-gray-500">*/}
          {/*              Get notified when an admin approves a milage request*/}
          {/*            </p>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="relative flex items-start">*/}
          {/*          <div className="flex h-5 items-center">*/}
          {/*            <input*/}
          {/*              id="offers"*/}
          {/*              name="offers"*/}
          {/*              type="checkbox"*/}
          {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*          <div className="ml-3 text-sm">*/}
          {/*            <label*/}
          {/*              htmlFor="offers"*/}
          {/*              className="font-medium text-gray-700"*/}
          {/*            >*/}
          {/*              Expenses*/}
          {/*            </label>*/}
          {/*            <p className="text-gray-500">*/}
          {/*              Get notified when an admin approves an expense request*/}
          {/*            </p>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </fieldset>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => postData()}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-main-bg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
