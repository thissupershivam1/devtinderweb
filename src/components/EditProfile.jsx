import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.user?.firstName);
  const [lastName, setLastName] = useState(user?.user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl);
  const [age, setAge] = useState(user?.user?.age || "");
  const [gender, setGender] = useState(user?.user?.gender || "");
  const [about, setAbout] = useState(user?.user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Track upload progress
  const dispatch = useDispatch();

  // Image upload handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true); // Start uploading

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codemate"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dnvtfttzg"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnvtfttzg/image/upload",
        formData
      );
      setPhotoUrl(response.data.secure_url); // Set the photo URL with Cloudinary's URL
      setIsUploading(false); // Stop uploading
    } catch (err) {
      console.error(err);
      setError("Failed to upload image");
      setIsUploading(false); // Stop uploading if error occurs
    }
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl, // Now contains the uploaded photo URL
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser({ user: res?.data?.data }));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                {/* Image Upload */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Upload Photo:</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && <p className="text-yellow-500">Uploading...</p>}
                </label>

                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  readOnly
                />

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
      <div className="label">
        <span className="label-text">Gender:</span>
      </div>
      <select
        value={gender}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setGender(e.target.value)} // Update gender state on change
      >
        <option value="">Select Gender</option> {/* Optional placeholder */}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </label>


                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
