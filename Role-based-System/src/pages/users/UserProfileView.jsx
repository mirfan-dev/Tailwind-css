import React, { useContext, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BASE_URL, formatDate } from "../../services/helper.service";

import profilePic from "../../assets/dp.jpg";
import UserContext from "../../context/user.context";

const UserProfileView = ({ user, handleShowModal }) => {
  const [loading, setLoading] = useState(false);
  const { userData, isLogin } = useContext(UserContext);

  return (
    <>
      {user && (
        <div className="w-full rounded-xl bg-white py-4 shadow-md sm:w-70 xl:w-100">
          {/* Profile Image */}
          <div className="flex h-40 items-center justify-center">
            <img
              onError={(event) => {
                event.currentTarget.setAttribute("src", profilePic);
              }}
              className="h-40 w-40 rounded-full object-cover"
              src={
                user.imageName
                  ? `${BASE_URL}/users/image/${user.userId}?${new Date().getTime()}`
                  : profilePic
              }
              alt="ProfilePic"
            />
          </div>

          {/* User Name */}
          <div className="mt-2 px-4">
            <h2 className="text-center text-2xl font-bold">{user.name}</h2>
          </div>

          {/* User Details */}
          <div className="mt-6 space-y-3 px-5">
            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2 text-sm">
              <span className="font-bold text-gray-500">Email</span>
              <span className="min-w-0 break-all text-left text-gray-800">
                {user.email || "-"}
              </span>
            </div>

            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2 text-sm">
              <span className="font-bold text-gray-500">Gender</span>
              <span className="min-w-0 break-words text-left text-gray-800 capitalize">
                {user.gender || "-"}
              </span>
            </div>

            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2 text-sm">
              <span className="font-bold text-gray-500">About</span>
              <span className="min-w-0 break-words text-left text-gray-800">
                {user.about || "-"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {isLogin && userData?.user?.userId === user.userId && (
            <Container className="mt-5 text-center">
              <Button
                onClick={handleShowModal}
                type="button"
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
                <span hidden={loading}>Update</span>
              </Button>

              <Button
                type="button"
                className="text-uppercase ms-3"
                variant="warning"
                disabled={loading}
              >
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                  hidden={!loading}
                />
                <span hidden={!loading}>Wait...</span>
                <span hidden={loading}>Order</span>
              </Button>
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfileView;
