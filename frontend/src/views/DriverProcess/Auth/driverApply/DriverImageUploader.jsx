import React, { useEffect, useState } from "react";
import passportExample from "../../../../assets/passport.jpg";

const DriverImageUploader = ({
  currentStep,
  error,
  setError,
  formData,
  setFormdata,
  valid,
  setValid,
  nextStep,
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Check if a profile picture has been uploaded and there are no errors
    const fileUploaded = formData.profilePic !== null;
    const noErrors = !error.profilePic;

    // Update valid state based on conditions
    setValid((prev) => ({
      ...prev,
      2: fileUploaded && noErrors,
    }));
  }, [formData, error, setValid]);

  const validateFile = (file) => {
    // Check if file exists
    if (!file) {
      return "Please select an image file";
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return ""; // No error
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate the file
      const validationError = validateFile(file);

      // Update error state
      setError((prev) => ({
        ...prev,
        second: {
          ...prev.second,
          profilePic: validationError,
        },
      }));

      // If no validation error, update form data and create preview
      if (!validationError) {
        setFormdata((prev) => ({
          ...prev,
          second: {
            ...prev.second,
            profilePic: file,
          },
        }));

        // Create a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // If there's an error, reset the file input
        setFormdata((prev) => ({
          ...prev,
          second: {
            ...prev.second,
            profilePic: null,
          },
        }));
        setPreview(null);
      }
    }
  };

  const handleNext = () => {
    if (valid[2]) {
      nextStep();
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mt-[-20px] mx-auto text-left">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Step {currentStep} : Upload Your Profile Photo
      </h2>
      <h3 className="text-[15px] text-gray-500 mb-3">
        Abyride Management staff have to verify your image and please know that
        once you upload there is no change it back so double check before you
        upload.
      </h3>
      <ol className="list-decimal px-3">
        <li className="text-[13px] text-gray-500">
          Make sure the photo is well lit, free of glare, and in focus
        </li>
        <li className="text-[13px] text-gray-500">
          No photos of a photo, filters, or alteration
        </li>
        <li className="text-[13px] text-gray-500">
          No objects like chains or sunglasses allowed
        </li>
      </ol>

      {/* Show preview if available, otherwise show example */}
      {preview ? (
        <label htmlFor="upload" className="relative w-full">
          <img
            src={preview}
            alt="profile preview"
            className="w-[220px] mx-auto h-[200px] mt-1 object-contain"
          />
          <p className="text-center text-green-600 text-sm mt-2">
            Preview of your photo
          </p>
        </label>
      ) : (
        <label htmlFor="upload" className="relative w-full">
          <img
            src={passportExample}
            alt="passport example image"
            className="w-[200px] mx-auto h-41 object-contain"
          />
        </label>
      )}

      <input
        type="file"
        id="upload"
        hidden
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {error.profilePic && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {error.profilePic}
        </p>
      )}

      <div className="flex justify-around gap-3 items-center">
        <label
          htmlFor="upload"
          className="w-1/2 bg-black text-white p-2 rounded-lg cursor-pointer mt-4 mx-auto text-center"
        >
          {formData.profilePic ? "Change File" : "Choose File"}
        </label>
        <button
          onClick={handleNext}
          disabled={!valid[2]}
          className="w-5/12 capitalize text-white p-2 rounded-lg cursor-pointer mt-4 mx-auto text-center bg-primaryred disabled:opacity-55 transition"
        >
          Next
        </button>
      </div>

      {formData.profilePic && (
        <p className="text-center  text-gray-600 text-sm mt-2">
          Selected: {formData.profilePic.name}
        </p>
      )}
    </div>
  );
};

export default DriverImageUploader;
