import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/user.context";

const CustomNavbar = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLogin = userContext?.isLogin;
  const user = userContext?.userData?.user;

  const isAdmin =
    user?.roles?.some((role) => role.roleName === "ROLE_ADMIN") || false;


  const profileUrl = !user?.userId
    ? "/login"
    : isAdmin
      ? "/admins/home"
      : `/users/profile/${user.userId}`;

  const doLogout = () => {
    userContext.logout();
    setOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  // ---------- Desktop classes (inline, no full width) ----------
  const desktopLinkClass = ({ isActive }) =>
    `inline-block whitespace-nowrap no-underline transition-colors duration-200 ${
      isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
    }`;

  const desktopLogoutClass =
    "inline-block whitespace-nowrap bg-transparent border-0 no-underline text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-200";

  // ---------- Mobile classes (full-width stacked) ----------
  const mobileLinkClass = ({ isActive }) =>
    `block w-full text-left no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 ${
      isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
    }`;

  const mobileLogoutClass =
    "block w-full text-left no-underline bg-transparent border-0 text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-200";

  // ---------- Desktop menu ----------
  const desktopMenu = isLogin ? (
    <>
      {isAdmin ? (
        <>
          <NavLink to="/admins/home" className={desktopLinkClass}>
            Admin Dashboard
          </NavLink>
          <NavLink to={profileUrl} className={desktopLinkClass}>
            <span className="inline-block max-w-[180px] truncate align-bottom">
              {user?.email || "My Profile"}
            </span>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={profileUrl} className={desktopLinkClass}>
            <span className="inline-block max-w-[180px] truncate align-bottom">
              {user?.email || "My Profile"}
            </span>
          </NavLink>
          <NavLink
            to="/users/attendance"
            state={{ token: user?.qrCodeToken }}
            className={desktopLinkClass}
          >
            Attendance
          </NavLink>
        </>
      )}

      <button type="button" onClick={doLogout} className={desktopLogoutClass}>
        Logout
      </button>
    </>
  ) : (
    <>
      <NavLink to="/login" className={desktopLinkClass}>
        Login
      </NavLink>
      <NavLink to="/signup" className={desktopLinkClass}>
        Sign Up
      </NavLink>
    </>
  );

  // ---------- Mobile menu ----------
  const mobileMenu = isLogin ? (
    <>
      {isAdmin ? (
        <>
          <NavLink to="/admins/home" className={mobileLinkClass} onClick={closeMenu}>
            Admin Dashboard
          </NavLink>
          <NavLink to={profileUrl} className={mobileLinkClass} onClick={closeMenu}>
            {user?.email || "My Profile"}
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={profileUrl} className={mobileLinkClass} onClick={closeMenu}>
            {user?.email || "My Profile"}
          </NavLink>
          <NavLink
            to="/users/attendance"
            state={{ token: user?.qrCodeToken }}
            className={mobileLinkClass}
            onClick={closeMenu}
          >
            Attendance
          </NavLink>
        </>
      )}

      <button type="button" onClick={doLogout} className={mobileLogoutClass}>
        Logout
      </button>
    </>
  ) : (
    <>
      <NavLink to="/login" className={mobileLinkClass} onClick={closeMenu}>
        Login
      </NavLink>
      <NavLink to="/signup" className={mobileLinkClass} onClick={closeMenu}>
        Sign Up
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-blue-400 font-bold text-2xl no-underline whitespace-nowrap"
        >
          QR Attendance
        </NavLink>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {desktopMenu}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-5 font-medium">
          {mobileMenu}
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;