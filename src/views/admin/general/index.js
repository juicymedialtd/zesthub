import { useState, useEffect } from "react";
import { ArrowsExpandIcon, EnvelopeIcon, GlobeAltIcon, PhoneIcon } from "@heroicons/react/solid";

export default function UserAdmin() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const res = await fetch("/api/v1/admin/users/all").then((res) =>
      res.json()
    );
    console.log(res);
    setUsers(res.users);
    setLoading(false);
  }

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {!loading && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {users !== undefined &&
            users.map((person) => (
              <li
                key={person.email}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {person.name}
                      </h3>
                      <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        {person.role}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {person.holidaysLeft} of {person.HolidayAllowance} holidays remaining
                    </p>
                  </div>
                  {person.profileUrl ? (
                    <img
                      className="inline-block h-8 w-8 rounded-full"
                      src={`${process.env.NEXT_PUBLIC_S3}/${person.profileUrl}`}
                      alt=""
                    />
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs font-medium leading-none text-white">
                        {item.User.name[0]}
                      </span>
                    </span>
                  )}
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a
                        href={`/admin?user=${person.id}`}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <ArrowsExpandIcon  className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">History</span>
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <a
                        href={`tel:${person.telephone}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Allowance</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
