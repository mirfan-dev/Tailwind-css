
import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteUser } from "../../services/user.service";
import UserContext from "../../context/user.context";
import {
  formatDate,
  getUserImageUrl,
} from "../../services/helper.service";
import profilePic from "../../assets/dp.jpg";

const SingleUserView = ({ index, user, updateUserList }) => {
  const userContext = useContext(UserContext);

  const deleteUserLocal = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const data = await deleteUser(user.userId);

        console.log("Delete response:", data);

        toast.success("User Deleted Successfully");
        updateUserList(user.userId);
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong");
      }
    }
  };

  const profileUserId = userContext?.userData?.user?.userId;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Index */}
      <td className="px-4 py-3 text-sm text-gray-700 text-center">
        {index + 1}
      </td>

      {/* User Image and Name */}
      <td className="px-4 py-3">
        <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
          <img
            src={
              user?.imageName
                ? getUserImageUrl(user.userId)
                : profilePic
            }
            alt={user?.name || "User profile"}
            className="w-14 h-14 rounded-full object-cover border border-gray-200"
          />

          <span className="text-sm font-medium text-gray-800 text-center">
            {user?.name || "N/A"}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-sm text-gray-700">
        {user?.email || "N/A"}
      </td>

      {/* Gender */}
      <td className="px-4 py-3 text-sm text-gray-700 capitalize">
        {user?.gender || "N/A"}
      </td>

      {/* About */}
      <td className="px-4 py-3 text-sm text-gray-700 min-w-[150px] max-w-[250px]">
        <p className="line-clamp-2">
          {user?.about || "N/A"}
        </p>
      </td>

      {/* Created At */}
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
      </td>

      {/* Updated At */}
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {user?.updatedAt ? formatDate(user.updatedAt) : "N/A"}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={deleteUserLocal}
            title="Delete User"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <MdDelete size={18} />
          </button>

          {profileUserId && (
            <NavLink
              to={`/users/profile/${user.userId}`}
              title="View User"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <FaEye size={16} />
            </NavLink>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SingleUserView;
