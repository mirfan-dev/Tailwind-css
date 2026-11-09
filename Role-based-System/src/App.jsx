
import "./App.css";
import UserProvider from "./context/user.provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import Profile from "./pages/users/Profile";
import ViewUserProfile from "./pages/admin/ViewUserProfile";
import Dashboard from "./pages/users/Dashboard";
import Home from "./pages/users/Home";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import CustomNavbar from "./components/CustomNavBar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>

        <ToastContainer
          position="bottom-center"
          theme="dark"
          draggable
          transition={Flip}
        />

        <CustomNavbar />

        <Routes>

          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* User Routes */}
          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admins" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route
              path="userProfile"
              element={<ViewUserProfile />}
            />
          </Route>

        </Routes>

      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
