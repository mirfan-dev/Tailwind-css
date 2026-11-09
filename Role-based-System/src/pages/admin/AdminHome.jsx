
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">

      <div className="w-full max-w-4xl rounded-xl bg-gray-800 px-6 py-12 text-center shadow-xl sm:px-10 md:py-16">

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Welcome to Admin Dashboard
        </h2>

        {/* Description */}
        <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
          Manage users and much more...
        </p>

        {/* Action Link */}
        <Link
          to="/admins/userProfile"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-base"
        >
          Manage Users
        </Link>

      </div>

    </section>
  );
};

export default AdminHome;
