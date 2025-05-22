import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ContactService } from "../Services/Landing/ContactService";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Swal from "sweetalert2";
import "../assets/css/ContactUs.css";

function RequestRide() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    PickUpDate: "",
    PickUpTime: "",
    DropOfAddress: "",
    PickUpAddress: "",
    Category: "",
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get current location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to a default location if geolocation fails
          setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco
        },
      );
    } else {
      console.log("Geolocation i    not supported by this browser.");
      // Fallback to a default location if geolocation is not supported
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco
    }
  }, []);

  // Calculate the route when either address changes
  const calculateRoute = async () => {
    if (!formData.PickUpAddress || !formData.DropOfAddress) {
      return; // Don't calculate if addresses are not provided
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: formData.PickUpAddress,
        destination: formData.DropOfAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text); // Display distance
    } catch (error) {
      console.error("Error calculating the route:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Call calculateRoute when either PickUpAddress or DropOfAddress changes
    if (name === "PickUpAddress" || name === "DropOfAddress") {
      calculateRoute();
    }
  };

  const handleSubmit = async () => {
    const {
      name,
      email,
      phone,
      DropOfAddress,
      PickUpDate,
      PickUpTime,
      Category,
    } = formData;

    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !DropOfAddress ||
      !PickUpDate ||
      !PickUpTime ||
      !Category
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields!",
      });
      return;
    }

    // Send data to backend
    try {
      const response = await ContactService.RequestRide(formData);

      // Show success notification
      Swal.fire({
        title: "Success!",
        text: response.message || "YOU ARE successfully requested a ride!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };
  // each time the url or path change it changes the header name
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",

      inline: "start",
    });
  }, []);

  return (
    <div>
      <Header title="Request Ride" />
      <div className="contactF-form">
        <div
          className="form-content border-2 "
          style={{ borderRadius: "10px", height: "540px", marginTop: "10px" }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="FormHeader">Request ride</h2>

            {/* Form Fields */}
            <div className="flex-field">
              <div className="field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  aria-label="name"
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  aria-label="email"
                />
              </div>
            </div>

            <div className="flex-field">
              <div className="field">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  aria-label="phone"
                />
              </div>
              <div className="field">
                <select
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  aria-label="service"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Individual">Individual</option>
                  <option value="Business Organization">
                    Business Organization
                  </option>
                </select>
              </div>
            </div>

            <div className="flex-field">
              <div className="field">
                <input
                  type="date"
                  name="PickUpDate"
                  value={formData.PickUpDate}
                  onChange={handleChange}
                  placeholder="Pick Up Date"
                  aria-label="PickUpDate"
                />
              </div>
              <div className="field">
                <input
                  type="time"
                  name="PickUpTime"
                  value={formData.PickUpTime}
                  onChange={handleChange}
                  placeholder="Pick Up Time"
                  aria-label="PickUpTime"
                />
              </div>
            </div>

            <div className="flex-field">
              <div className="field">
                <input
                  type="text"
                  name="PickUpAddress"
                  value={formData.PickUpAddress}
                  onChange={handleChange}
                  placeholder="Your Pick Up Address"
                  aria-label="PickUpAddress"
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="DropOfAddress"
                  value={formData.DropOfAddress}
                  onChange={handleChange}
                  placeholder="Your Drop Off Address"
                  aria-label="DropOfAddress"
                />
              </div>
            </div>

            <button type="button" className="formBtn" onClick={handleSubmit}>
              Request Ride <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </form>
        </div>

        <div className="form-map">
          {distance && (
            <p className="text-4xl text-center m-4 font-bold">
              Distance: {distance}
            </p>
          )}
          <LoadScript googleMapsApiKey="AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE">
            <GoogleMap
              mapContainerStyle={{
                width: "10%",
                height: "540px",
                padding: "10px",
                margin: "10px",
                borderRadius: "10px",
              }}
              center={currentLocation || { lat: 37.7749, lng: -122.4194 }} // Default to SF if no location found
              zoom={10}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default RequestRide;
