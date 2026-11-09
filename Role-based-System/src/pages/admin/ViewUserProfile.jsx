import React, { useEffect, useState } from "react";
import { getAllUser, searchUser } from "../../services/user.service";
import SingleUserView from "../../components/admin/SingleUserView";
import { USER_PAGE_SIZE } from "../../services/helper.service";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

const ViewUserProfile = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    getUser(0, USER_PAGE_SIZE, "createdAt", "desc");
  }, []);

  // Get all users with pagination
  const getUser = async (
    pageNumber = 0,
    pageSize = USER_PAGE_SIZE,
    sortBy = "createdAt",
    sortDir = "desc",
  ) => {
    try {
      setLoading(true);
      setIsSearchMode(false);

      const data = await getAllUser(pageNumber, pageSize, sortBy, sortDir);

      console.log("All Users:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error in getting user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user list after deletion
  const updateUserList = (userId) => {
    if (!user) return;

    const updatedContent = user.content.filter(
      (item) => item.userId !== userId,
    );

    setUser({
      ...user,
      content: updatedContent,
      totalElements: Math.max(0, user.totalElements - 1),
    });
  };

  // Search users
  const searchUsers = async (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      toast.warning("Please enter a search term");
      return;
    }

    try {
      setLoading(true);

      const data = await searchUser(searchQuery.trim());

      console.log("Search Results:", data);

      if (!Array.isArray(data)) {
        toast.error("Invalid search response from server");
        return;
      }

      setIsSearchMode(true);

      setUser({
        content: data,
        totalElements: data.length,
        totalPages: data.length > 0 ? 1 : 0,
        number: 0,
        first: true,
        last: true,
      });

      if (data.length === 0) {
        toast.info("No users found");
      }
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  // Reset search and load all users
  const resetSearch = () => {
    setSearchQuery("");
    getUser(0, USER_PAGE_SIZE, "createdAt", "desc");
  };

  // Pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 0 || pageNumber >= user.totalPages) return;

    getUser(pageNumber, USER_PAGE_SIZE, "createdAt", "desc");
  };


const userView = () => {
  return (
    <div className=" bg-gray-600 w-full rounded-xl bg-white p-5 shadow-md">

      {/* Heading */}
      <h5 className="mb-5 text-xl font-bold text-gray-800">
        View User
      </h5>

      {/* Search Section */}
          <form onSubmit={searchUsers} className="mb-6 w-full">
            <label className="mb-2 block font-semibold text-gray-700">
              Search User
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-12 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Search users"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </form>

      {/* User Table */}
      <div className="w-full overflow-x-auto hide-scrollbar">
        <table className="w-full min-w-[1000px] border-collapse text-center text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-3 py-3">#SN</th>
              <th className="border px-3 py-3">Name</th>
              <th className="border px-3 py-3">Email</th>
              <th className="border px-3 py-3">Gender</th>
              <th className="border px-3 py-3">About</th>
              <th className="border px-3 py-3">CreatedAt</th>
              <th className="border px-3 py-3">UpdatedAt</th>
              <th className="border px-3 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {user?.content?.map((users, index) => (
              <SingleUserView
                key={users.userId}
                index={index}
                user={users}
                updateUserList={updateUserList}
              />
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-wrap justify-end gap-1">

        <button
          onClick={() => getUser(0, USER_PAGE_SIZE, "createdAt", "desc")}
          disabled={user.first}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          First
        </button>

        <button
          onClick={() =>
            getUser(user.number - 1, USER_PAGE_SIZE, "createdAt", "desc")
          }
          disabled={user.number === 0}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(user.totalPages)]
          .map((obj, i) => i)
          .map((item) => (
            <button
              key={item}
              onClick={() =>
                getUser(item, USER_PAGE_SIZE, "createdAt", "desc")
              }
              className={`rounded-md border px-3 py-2 text-sm transition ${
                user.number === item
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item + 1}
            </button>
          ))}

        <button
          onClick={() =>
            getUser(user.number + 1, USER_PAGE_SIZE, "createdAt", "desc")
          }
          disabled={user.number === user.totalPages - 1}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

        <button
          onClick={() =>
            getUser(
              user.totalPages - 1,
              USER_PAGE_SIZE,
              "createdAt",
              "desc"
            )
          }
          disabled={user.last}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Last
        </button>

      </div>
    </div>
  );
};

return (
  <>
    <div className="w-full px-3 py-4 sm:px-5">
      {user ? (
        userView()
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mt-2 text-center text-xl font-semibold text-gray-700">
            User not Found
          </h3>
        </div>
      )}
    </div>
  </>
);
};

export default ViewUserProfile;

