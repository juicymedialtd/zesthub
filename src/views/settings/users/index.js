import { useQuery } from "react-query";

import InviteUserModal from "../../../components/InviteUserModal";

async function getTeamUsers() {
  const res = await fetch("/api/v1/settings/users/all");
  return res.json();
}

// TODO -> Fetch all users in Team - Display Users in a table -> CRUD user

export default function UserSettings() {
  const { data, status, error, refetch } = useQuery(
    "getTeamUsers",
    getTeamUsers
  );

  async function deleteUser(id) {
    await fetch("/api/v1/auth/user/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then(() => refetch());
  }

  return (
    <>
      <div className="float-right pb-4 ">
        <InviteUserModal />
      </div>
      {status === "success" && (
        <div className="mt-8 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-nav-bg">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                >
                  Role
                </th>
                <th scope="col" className="relative py-3.5">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.users.map((item) => (
                <tr key={item.id}>
                  <td className="w-3/4 max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 capitalize">
                    {item.name}
                  </td>
                  <td className="hidden px-3 py-2 text-sm text-gray-900 lg:table-cell">
                    {item.email}
                  </td>

                  <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap"></td>
                  <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">
                    {item.role}
                  </td>
                  <td className="py-2 text-sm whitespace-nowrap space-x-4">
                    {/* <button
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      update
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      reset password
                    </button> */}
                    <button
                      type="button"
                      onClick={() => deleteUser(item.id)}
                      className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
