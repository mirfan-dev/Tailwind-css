import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";
import {
  getUserById,
  updateUser,
  userProfilePicture,
} from "../../services/user.service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profilePic from "../../assets/dp.jpg";
import UserProfileView from "./UserProfileView";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  // state for handle image
  const [image, setImage] = useState({
    placeholder: profilePic,
    file: null,
  });

  // modals state
  const [show, setShow] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getUserDataFromServer();
  }, [userId]);

  const getUserDataFromServer = () => {
    console.log(userContext);

    getUserById(userId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !");
      });
  };

  const updateFieldHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  // update user data by calling api
  const updateUserData = () => {
    console.log("updating user data");

    if (!user || user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }

    setUpdateLoading(true);

    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        setUser(updatedUser);
        toast.success("User details updated !!");

        // update image
        if (image.file == null) {
          setUpdateLoading(false);
          handleClose();
          return;
        }

        userProfilePicture(image.file, userId)
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded !!");
          })
          .finally(() => {
            setUpdateLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not updated !! Error");
        setUpdateLoading(false);
      });
  };

  // function for image change
  const handleProfileImageChange = (event) => {
    const localFile = event.target.files[0];

    if (!localFile) return;

    console.log(localFile);

    if (localFile.type === "image/png" || localFile.type === "image/jpeg") {
      const reader = new FileReader();

      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: localFile,
        });
      };

      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File !!");
      setImage({
        placeholder: profilePic,
        file: null,
      });
      event.target.value = "";
    }
  };

  // clear the image
  const clearImage = () => {
    setImage({
      placeholder: profilePic,
      file: null,
    });
  };

  const updateViewModel = () => {
    return (
      <>
        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            {/* Modal */}
            <div className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Update Information
                </h2>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-2xl text-gray-500 transition hover:text-red-600"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-gray-50 p-5">
                    <label className="mb-4 block text-sm font-semibold text-gray-700">
                      Profile Image
                    </label>

                    {/* Image Preview */}
                    <img
                      src={image.placeholder}
                      alt="Profile Preview"
                      className="mb-4 h-40 w-40 rounded-full border-4 border-white object-cover shadow-md"
                    />

                    {/* File Upload */}
                    <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleProfileImageChange}
                        className="w-full cursor-pointer rounded-md border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700"
                      />

                      <button
                        type="button"
                        onClick={clearImage}
                        className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                      >
                        Clear
                      </button>
                    </div>

                    <p className="mt-3 text-center text-xs text-gray-500">
                      Select a square image for a better profile appearance.
                    </p>
                  </div>

                  {/* name + email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      onChange={(e) => updateFieldHandler(e, "name")}
                      value={user.name}
                      className="border border-blue-800 rounded-md px-4 py-2"
                    />
                    <input
                      type="email"
                      placeholder="Enter Email"
                      onChange={(e) => updateFieldHandler(e, "email")}
                      value={user.email}
                      className="border border-blue-800 rounded-md px-4 py-2"
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Select Gender
                    </label>

                    <div className="flex items-center gap-8">
                      {/* Male */}
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="radio"
                          name="gender"
                          id="gender-male"
                          value="male"
                          checked={user.gender === "male"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                          className="h-5 w-5 cursor-pointer accent-blue-600"
                        />
                        <span className="text-sm text-gray-600">Male</span>
                      </label>

                      {/* Female */}
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="radio"
                          name="gender"
                          id="gender-female"
                          value="female"
                          checked={user.gender === "female"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                          className="h-5 w-5 cursor-pointer accent-blue-600"
                        />
                        <span className="text-sm text-gray-600">Female</span>
                      </label>
                    </div>
                  </div>

                  {/* about */}
                  <div className="grid grid-cols-1  gap-4">
                    <textarea
                      rows={5}
                      placeholder="Enter Your Message"
                      onChange={(event) => updateFieldHandler(event, "about")}
                      className="w-full border border-blue-800 rounded-md px-4 py-2"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={updateUserData}
                  disabled={updateLoading}
                  className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}

                  {updateLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Main component return
  return (
    <div className="container mx-auto px-4 py-8">
      {user ? (
        <div className="mx-auto flex max-w-5xl justify-center">
          {/* User Profile View */}
          <UserProfileView user={user} handleShowModal={() => setShow(true)} />

          {/* Update Profile Modal */}
          {updateViewModel()}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          Loading user information...
        </p>
      )}
    </div>
  );
};

export default Profile;
