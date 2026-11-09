
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import UserContext from "../../context/user.context";

const SideMenu = () => {
  const { logout } = useContext(UserContext);

  const menuItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside className="sticky top-5 w-full rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <nav className="flex flex-col gap-2">
        <NavLink to="/admins/home" className={menuItemClass}>
          <GrHome size={20} />
          <span>Home</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideMenu;
