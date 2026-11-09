
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user.context";

const CustomNavbar = () => {
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const isLogin = userContext?.isLogin;

  // Get logged-in user
  const user = userContext?.userData?.user;

  // Check admin using your existing role structure
  const isAdmin = user?.roles?.some(
    (role) => role.roleName === "ROLE_ADMIN"
  ) || false;

  // Profile navigation
  const profileUrl = isAdmin
    ? "/admins/home"
    : `/users/profile/${user?.userId}`;

  // Logout
  const doLogout = () => {
    userContext.logout();
    setOpen(false);
  };

  // Close mobile menu
  const closeMenu = () => setOpen(false);

  // Navigation styles
  const linkClass = ({ isActive }) =>
    `block no-underline transition-colors duration-200 ${
      isActive
        ? "text-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`;

  // Logout text styles
  const logoutClass =
    "block text-gray-300 hover:text-red-400 no-underline cursor-pointer transition-colors duration-200";

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">

      {/* Navbar Header */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-blue-400 font-bold text-2xl no-underline"
        >
          E-commerce-App
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">

          {isLogin ? (
            <>
              {/* Admin Dashboard - Only Admin */}
              {isAdmin && (
                <NavLink
                  to="/admins/home"
                  className={linkClass}
                >
                  Admin Dashboard
                </NavLink>
              )}

              {/* Logged-in User/Admin Email */}
              <NavLink
                to={profileUrl}
                className={linkClass}
              >
                {user?.email || "My Profile"}
              </NavLink>

              {/* Logout - Simple Text */}
              <NavLink
                to="/login"
                onClick={doLogout}
                className={logoutClass}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/signup" className={linkClass}>
                SignUp
              </NavLink>
            </>
          )}

        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-5 font-medium">

          {isLogin ? (
            <>
              {/* Admin Dashboard */}
              {isAdmin && (
                <NavLink
                  to="/admins/home"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </NavLink>
              )}

              {/* User/Admin Email */}
              <NavLink
                to={profileUrl}
                className={linkClass}
                onClick={closeMenu}
              >
                {user?.email || "My Profile"}
              </NavLink>

              {/* Logout - Simple Text */}
              <NavLink
                to="/login"
                onClick={doLogout}
                className={logoutClass}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={linkClass}
                onClick={closeMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={linkClass}
                onClick={closeMenu}
              >
                SignUp
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
