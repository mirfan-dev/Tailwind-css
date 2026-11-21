import { NavLink } from "react-router-dom";
import { GrHome, GrCalendar } from "react-icons/gr"; // Added GrCalendar
import { FiUsers } from "react-icons/fi";
// Removed UserContext and useContext since they were unused

const SideMenu = () => {
  // Cleaner active/inactive styles to match the rest of the app
  const menuItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    // Changed shadow-md to shadow-sm, added w-full max-w-xs (adjust max-w to fit your layout)
    <aside className="sticky top-5 w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      
      {/* Combined into one nav tag with a flex gap */}
      <nav className="flex flex-col gap-2">
        
        <NavLink to="/admins/home" className={menuItemClass}>
          <GrHome size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/admins/userProfile" className={menuItemClass}>
          <FiUsers size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admins/attendanceDashboard" className={menuItemClass}>
          <GrCalendar size={20} />
          <span>Attendance</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default SideMenu;