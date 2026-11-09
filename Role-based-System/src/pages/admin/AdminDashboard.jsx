
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isAdminUser } from "../../auth/auth.helper";
import UserContext from "../../context/user.context";
import SideMenu from "../../components/admin/SideMenu";

const AdminDashboard = () => {
  const userContext = useContext(UserContext);

  const dashboardView = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

            {/* Side Menu */}
            <aside className="md:col-span-3 lg:col-span-2">
              <SideMenu />
            </aside>

            {/* Content Area */}
            <main className="min-w-0 md:col-span-9 lg:col-span-10">
              <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
                <Outlet />
              </div>
            </main>

          </div>
        </div>
      </div>
    );
  };

  return isAdminUser() ? (
    dashboardView()
  ) : (
    <Navigate to="/users/home" replace />
  );
};

export default AdminDashboard;
