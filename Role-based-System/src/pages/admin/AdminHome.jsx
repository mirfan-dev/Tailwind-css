import { Link } from "react-router-dom";
import { FiUsers, FiCalendar } from "react-icons/fi"; // Icons make it look professional

const AdminHome = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">
      
      <div className="w-full max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Admin Dashboard
          </h2>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Attendance Card */}
          <Link
            to="/admins/attendanceDashboard"
            className="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
              <FiCalendar size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Manage Attendance
            </h3>
            <p className="text-sm text-gray-500 text-center">
              View daily logs, track check-ins, and manage employee attendance.
            </p>
          </Link>

          {/* User Management Card */}
          <Link
            to="/admins/userProfile" 
            className="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-200 hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <div className="p-4 bg-green-50 text-green-600 rounded-full mb-4 group-hover:bg-green-100 transition-colors">
              <FiUsers size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              User Management
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Add, edit, or remove users and manage their system roles.
            </p>
          </Link>

        </div>
      </div>
      
    </section>
  );
};

export default AdminHome;