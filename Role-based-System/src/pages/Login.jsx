import React, { useContext, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../services/user.service";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  let navigate = useNavigate();

  const userContext = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState({
    erroData: null,
    isError: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    setLoading(true);
    loginUser(data)
      .then((data) => {
        console.log(data);
        toast.success("Logged In");
        setError({
          erroData: null,
          isError: false,
        });
        userContext.login(data);
        navigate(`/users/home`);
        clearData();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setError({
          erroData: error,
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearData = () => {
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-6"
        onSubmit={submitForm}
      >
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-3">
          Sign In
        </h2>

        <Alert
          className="mt-3"
          onClose={() =>
            setError({
              isError: false,
              errorData: null,
            })
          }
          dismissible
          variant="danger"
          show={error.isError}
        >
          <Alert.Heading>Username or password is incorrect</Alert.Heading>
          <p>{error.errorData?.response?.data?.message}</p>
        </Alert>

        {/* email */}
        <div className=" grid grid-cols-1 gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => handleChange(e, "email")}
            value={data.email}
            className=" w-full border border-blue-800 rounded-md px-4 py-2"
          />
        </div>

        {/* password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={data.password}
            onChange={(e) => handleChange(e, "password")}
            className="border border-blue-800 rounded-md px-4 py-2 w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-transparent border-0 p-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>

        <Container className="text-center mt-3">
          <p className="text-center">
            Forgot Password?{" "}
            <NavLink
              to="/resetPassword"
              className="text-primary fw-bold text-decoration-none"
            >
              Click Here
            </NavLink>
          </p>
          <p className="text-center">
            Do you have an account?{" "}
            <NavLink
              to="/signup"
              className="text-primary fw-bold text-decoration-none"
            >
              SignUp
            </NavLink>
          </p>
        </Container>

        <Container className="text-center ">
          <Button
            type="submit"
            className="text-uppercase"
            variant="success"
            disabled={loading}
          >
            <Spinner
              animation="border"
              size="sm"
              className="me-2"
              hidden={!loading}
            />
            <span hidden={!loading}>Wait...</span>
            <span hidden={loading}>Login</span>
          </Button>
          <Button
            className="ms-3 text-uppercase"
            variant="danger"
            onClick={clearData}
          >
            Reset
          </Button>
        </Container>
      </form>
    </div>
  );
};

export default Login;
