import React, { useState, useEffect, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { IoTimeSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { BiSolidChevronDownSquare } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import ConfirmBookingModal from "./confimBooking";
import { IoIosCar } from "react-icons/io";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { SavePaymentMethod } from "../Services/Landing/paymentServices";
import { BookRide } from "../Services/Landing/requestRideService";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";

const RideBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    pickLong: "",
    pickLat: "",
    dropLong: "",
    dropLat: "",
    pickTime: "",
    pickPerson: "Me",
  });

  const [paymentData, setPaymentData] = useState({
    type: "Credit or Debit Card",
    cardNumber: "",
    expiry: "",
    securityCode: "",
    country: "Rwanda",
    nickname: "",
  });

  // Destructure state values for ease of use
  const { cardNumber, expiry, securityCode, country, nickname } = paymentData;

  const [showSwitchRider, setShowSwitchRider] = useState(false);
  const [selectedRider, setSelectedRider] = useState("Me");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [PickForm, setPickForm] = useState(true);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [showPickupForm, setShowPickupForm] = useState(true);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [availableCars, setAvailableCars] = useState([]);
  const [finalSelection, setFinalSelection] = useState("Pick Time");
  const [CarDriver, setRiderCar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [TimeData, setTimeData] = useState({});
  const [PersonData, setPersonData] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [ActiveCar, SetActiveCar] = useState(null);

  // Refs for autocomplete inputs
  const pickupRef = useRef();
  const dropoffRef = useRef();

  const isFormFilled = formData.pickup.trim() !== "";

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
      console.log("Geolocation is not supported by this browser.");
      // Fallback to a default location if geolocation is not supported
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco
    }
  }, []);

  const calculateRoute = async () => {
    if (!formData.pickup || !formData.dropoff) {
      return; // Don't calculate if addresses are not provided
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    // eslint-disable-next-line no-undef
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Hide default "A" & "B" markers
      polylineOptions: {
        strokeColor: "#FF5733",
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
    });

    directionsRenderer.setMap(map);

    async function calculateRoute() {
      try {
        const results = await directionsService.route({
          origin: formData.pickup,
          destination: formData.dropoff,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });

        directionsRenderer.setDirections(results);

        // Get the start and end location coordinates
        const startLocation = results.routes[0].legs[0].start_location;
        const endLocation = results.routes[0].legs[0].end_location;

        // Add custom pickup marker
        // eslint-disable-next-line no-undef
        new google.maps.Marker({
          position: startLocation,
          map: map,
          label: {
            text: "Pickup", // Custom text
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          },
          icon: {
            // eslint-disable-next-line no-undef
            path: google.maps.SymbolPath.CIRCLE, // Custom shape
            scale: 10,
            fillColor: "#34D399", // Green
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });

        // Add custom dropoff marker
        // eslint-disable-next-line no-undef
        new google.maps.Marker({
          position: endLocation,
          map: map,
          label: {
            text: "Dropoff", // Custom text
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          },
          icon: {
            // eslint-disable-next-line no-undef
            path: google.maps.SymbolPath.CIRCLE, // Custom shape
            scale: 10,
            fillColor: "#FFF", // Red
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    }
  };


  // map

  const libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries,
  });

  // handle place select for pickup and droppoff adress

  const handlePlaceSelect = (type) => {
    let place = null;

    if (type === "pickup") {
      place = pickupRef.current.getPlace();
    } else if (type === "dropoff") {
      place = dropoffRef.current.getPlace();
    }

    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      if (type === "pickup") {
        // eslint-disable-next-line no-undef
        setPickupCoords({ lat: lat(), lng: lng() });
      } else {
        // eslint-disable-next-line no-undef
        setDropoffCoords({ lat: lat(), lng: lng() });
      }
    }
  };

  // handle change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Call calculateRoute when either PickUpAddress or DropOfAddress changes
    if (name === "pickup" || name === "dropoff") {
      calculateRoute();
    }
  };

  // handle rider change

  const handleRiderChange = (rider) => {
    setSelectedRider(rider);
    setFormData((prev) => ({ ...prev, pickPerson: rider }));
    setShowSwitchRider(false);
  };

  const handleConfirmSelection = (e) => {
    e.stopPropagation(); // Prevents modal from closing unexpectedly

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get current time in HH:MM format
    const currentDate = now.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    let selectedValue = "";

    if (selectedOption === "Today") {
      // Validate time: must be current or future time
      if (selectedTime < currentTime) {
        toast.error("Time must be the current time or a future time!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
      selectedValue = `Today at ${selectedTime}`;
    } else {
      // Validate date: must be today or a future date
      if (selectedDate < currentDate) {
        toast.error("Date must be today or a future date!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
      selectedValue = `For Later on ${selectedDate}`;
    }

    // Update state properly
    setFinalSelection(selectedValue);
    setFormData((prev) => ({ ...prev, pickTime: selectedValue }));

    setShowTimeModal(false);
  };

  // handle submit of request ride form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing route so that previous lines do not remain
    setDirections(null);

    const origin = pickupRef.current.getPlace();
    const destination = dropoffRef.current.getPlace();
    const { pickTime, pickPerson } = formData;

    if (!origin || !destination || !pickTime || !pickPerson) {
      toast.error("All fields must be filled", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const updatedFormData = {
      pickup: origin.formatted_address,
      dropoff: destination.formatted_address,
      // eslint-disable-next-line no-undef
      pickLong: pickupCoords.lng,
      // eslint-disable-next-line no-undef
      pickLat: pickupCoords.lat,
      // eslint-disable-next-line no-undef
      dropLong: dropoffCoords.lng,
      // eslint-disable-next-line no-undef
      dropLat: dropoffCoords.lat,
      time: pickTime,
      person: pickPerson,
      userId: "00ABY45RID",
    };
    setTimeData(updatedFormData.time);
    setPersonData(updatedFormData.person);
    // Update state with new pickup and dropoff details
    setFormData(updatedFormData);

    // Search for available cars based on pickup location
    const response = await BookRide.SearchPlaceCar(updatedFormData);

    fetchAvailableCars();

    // Request new directions from Google Maps API
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: origin.geometry.location,
      destination: destination.geometry.location,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    // Set the new route, distance, and duration
    setDirections(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
    setShowRideOptions(true);
  };

  // Function to fetch available cars based on pickup coordinates
  const fetchAvailableCars = async () => {
    try {
      const cars = await BookRide.FetchAvailableCar();

      // Check if cars is an array before filtering
      if (Array.isArray(cars)) {
        // const filteredCars = cars.filter(car =>
        //     car.location.latitude === pickupCoords.lat &&
        //     car.location.longitude === pickupCoords.lng
        // );
        setAvailableCars(cars);
      } else {
        console.error("Fetched data is not an array:", cars);
      }
    } catch (error) {
      console.error("Error fetching available cars:", error);
    }
  };

  // handle booking confirm and submit it

  const handleBooking = async (e) => {
    e.preventDefault();

    const origin = pickupRef.current?.getPlace();
    const destination = dropoffRef.current?.getPlace();

    if (!origin || !destination) {
      toast.error("Please select both pickup and dropoff locations.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const RequestData = {
      pickup: origin.formatted_address,
      dropoff: destination.formatted_address,
      // eslint-disable-next-line no-undef
      pickLong: pickupCoords?.lng,
      // eslint-disable-next-line no-undef
      pickLat: pickupCoords?.lat,
      // eslint-disable-next-line no-undef
      dropLong: dropoffCoords?.lng,
      // eslint-disable-next-line no-undef
      dropLat: dropoffCoords?.lat,
      time: TimeData || "", // Add fallback
      person: PersonData || 1, // Default to 1 if undefined
      userId: "00ABY45RID",
      Driver: CarDriver,
    };

    try {
      const response = await BookRide.ConfirmRequestRide(RequestData);
      toast.success("Ride booked successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/trips");
      }, 3000);

      // eslint-disable-next-line no-undef
      setPickupCoords(null);
      // eslint-disable-next-line no-undef
      setDropoffCoords(null);
      setRiderCar(null);

      if (pickupRef.current) pickupRef.current.value = "";
      if (dropoffRef.current) dropoffRef.current.value = "";

      setDirections(null);
      setDistance("");
      setDuration("");

      if (map && currentLocation) {
        map.setZoom(14);
      }

      setIsModalOpen(false);
      setShowRideOptions(false);
    } catch (error) {
      console.error("Error saving ride request:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // handle save payment method

  const handleChangePayment = (e) => {
    const { name, value } = e.target;
    // Map names if necessary (e.g., expiryDate to expiry, nickName to nickname)
    const fieldName =
      name === "expiryDate"
        ? "expiry"
        : name === "nickName"
          ? "nickname"
          : name;
    setPaymentData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();

    // Function to validate payment data
    const validatePaymentData = (data) => {
      const errors = [];
      if (!data.cardNumber || data.cardNumber.trim() === "") {
        errors.push("Card Number is required.");
      }
      if (!data.expiry || data.expiry.trim() === "") {
        errors.push("Expiry date is required.");
      }
      if (!data.securityCode || data.securityCode.trim() === "") {
        errors.push("Security Code is required.");
      }
      if (!data.country || data.country.trim() === "") {
        errors.push("Country is required.");
      }
      // Additional validations can be added here (e.g., regex check for card number format)
      return errors;
    };

    // Usage example before calling the service
    const errors = validatePaymentData(paymentData);
    if (errors.length > 0) {
      errors.forEach((error) =>
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }),
      );
      return; // Stop execution if validation fails
    }

    await SavePaymentMethod.PaymentMethod(paymentData);

    try {
      await SavePaymentMethod.PaymentMethod(paymentData);

      toast.success("Payment method added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setPaymentData({
        type: "",
        cardNumber: "",
        expiry: "",
        securityCode: "",
        country: "",
        nickname: "",
      });
      setShowPaymentModal(false);
    } catch (error) {
      toast.error("Failed to add payment method", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  // get current location

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => alert("Geolocation failed!"),
    );
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  // handle close modal

  const closeModal = () => {
    setShowPaymentModal(false);
    setPaymentMethod(null);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-5 sm:p-3 lg:p-4">
      <div className="flex flex-col h-full lg:flex-row w-full md:justify-center p-8 gap-16 rounded-lg relative md:p-5 md:gap-12 sm:gap-1 overflow-hidden xl:w-[4/7]">
        {/* Form Panel */}
        {PickForm && (
          <div className="p-2 justify-center flex w-full lg:w-200 ">
            {/* REQUEST RIDE FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-3  w-full md:w-8/12 lg:w-full rounded"
            >
              <h2 className="flex font-bold text-[3rem] md:text-[2.5rem] md:text-center">
                Go anywhere with Abyride
              </h2>

              <div className="flex flex-col gap-2.5 mt-10">
                {/* Pickup Location */}
                <div className="inline-flex items-center w-full rounded-lg p-3 bg-[#e9e9e9]">
                  <span className="w-4 h-4 mr-3">
                    <FaDotCircle size={16} />
                  </span>
                  <Autocomplete
                    onLoad={(ref) => (pickupRef.current = ref)}
                    onPlaceChanged={() => handlePlaceSelect("pickup")}
                  >
                    <input
                      name="pickup"
                      id="pickup"
                      type="text"
                      placeholder="Pickup location"
                      className="bg-transparent focus:outline-none w-full text-black placeholder-black"
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </div>

                {/* Dropoff Location */}
                <div className="flex items-center w-full rounded-lg p-3 bg-[#e9e9e9]">
                  <span className="w-4 h-4 mr-3">
                    <FaDotCircle size={16} />
                  </span>
                  <Autocomplete
                    onLoad={(ref) => (dropoffRef.current = ref)}
                    onPlaceChanged={() => handlePlaceSelect("dropoff")}
                  >
                    <input
                      name="dropoff"
                      type="text"
                      placeholder="Dropoff location"
                      className="bg-transparent focus:outline-none w-full text-black placeholder-black"
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </div>
              </div>

              <div className="flex gap-2 mt-2.5">
                {/* Pickup Time */}
                <div
                  className="flex items-center rounded-lg p-3 w-full bg-[#e9e9e9] cursor-pointer"
                  onClick={() => setShowTimeModal(true)}
                >
                  <IoTimeSharp className="text-gray-900 size-6" />
                  <select
                    className="bg-transparent focus:outline-none w-full text-gray-900"
                    name="pickTime"
                    readOnly
                    onChange={handleConfirmSelection}
                  >
                    <option value={finalSelection}>{finalSelection}</option>
                  </select>
                </div>
                {/* For Me */}
                <div
                  className="flex items-center rounded-lg p-2 w-full bg-[#e9e9e9]"
                  onClick={() => setShowSwitchRider(true)}
                >
                  <span className="material-icons text-gray-900">
                    <IoPerson className=" size-4" />{" "}
                  </span>
                  <select
                    className="bg-transparent focus:outline-none w-full text-black"
                    name="pickPerson"
                    onChange={(e) => handleRiderChange(e.target.value)}
                  >
                    <option value="For Me"> For Me</option>
                    <option value="Order ride for someone else">
                      For someone else
                    </option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className={`mt-4 w-full p-2.5 font-medium rounded-lg focus:outline-none ${
                  isFormFilled
                    ? "bg-black text-white"
                    : "bg-[#293751] text-white"
                }`}
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* second container to get for confirm ride and add more info */}
        {showRideOptions && (
          <div className="bg-white p-2 rounded-1xl shadow-lg w-full max-w-md">
            {/* Pickup & Dropoff Info */}
            <h5 className="text-black font-bold font-16 text-center">
              Choose a Ride
            </h5>
            <div className="border p-1 rounded-lg bg-gray-50 mb-2 text-sm">
              <div className="flex justify-between items-center p-2">
                <div className="text-black">
                  <span className="font-semibold">{formData.pickup}</span> ➝{" "}
                  {formData.dropoff}
                </div>
                <IoIosArrowDown className="text-gray-900" />
              </div>
            </div>

            {/* Available Cars (Dynamic Data) */}
            <div className=" space-y-3 h-[250px] overflow-y-auto border p-2 rounded-lg">
              {availableCars.length > 0 ? (
                availableCars.map((car, index) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      setRiderCar(car.driver);
                      SetActiveCar(car.driver);
                    }}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer 
                      ${ActiveCar === car.driver ? "border-2 border-black" : ""} 
                      ${CarDriver === car.id ? "bg-blue-200 border-green-500" : "bg-white"} 
                      hover:bg-gray-200 transition-all`}
                  >
                    <div>
                      <div className="flex items-center space-x-10">
                        <img
                          src="abyride x.png"
                          alt="car"
                          className="w-10 h-15"
                        />
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-xs">
                            {car.carname}
                          </span>
                          <div className="flex items-center space-x-1">
                            <FaUser className="text-gray-700" />
                            <span>{car.person}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-column text-center space-x-12">
                        <p className="text-gray-600">Available</p>
                        <small className="text-gray-600 space-x-12">
                          Affordable ride to you
                        </small>
                      </div>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {" "}
                      {car.price} $
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No available cars at this location.
                </p>
              )}
            </div>

            {/* Payment & Review Buttons */}
            <button
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 rounded-lg focus:outline-none"
              onClick={() => setShowPaymentModal(true)}
            >
              Add Payment Method
            </button>

            <button
              className={`mt-2 w-full py-2 rounded-lg font-medium text-white 
                ${CarDriver ? "bg-black text-white" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!CarDriver}
              onClick={() => setIsModalOpen(true)}
            >
              Review & Confirm
            </button>
          </div>
        )}

        {/* comfirmation booking modal to be clicked and get all detail about the ride and the car */}
        <ConfirmBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          distance={distance}
          duration={duration}
          CarDriver={CarDriver}
          handleBooking={handleBooking}
        />

        {/* payment option container */}
        {showPaymentModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPaymentModal(false);
              }
            }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {paymentMethod
                    ? `Add ${paymentMethod}`
                    : "Add Payment Method"}
                </h2>
                <MdClose
                  className="text-gray-700 cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              {!paymentMethod ? (
                <div className="space-y-4">
                  <div
                    className="border p-3 rounded-lg cursor-pointer flex items-center gap-2"
                    onClick={() => setPaymentMethod("Credit or Debit Card")}
                  >
                    <span>💳</span> Credit or Debit Card
                  </div>
                  <div
                    className="border p-3 rounded-lg cursor-pointer flex items-center gap-2"
                    onClick={() => setPaymentMethod("PayPal")}
                  >
                    <span>🅿️</span> PayPal
                  </div>
                  <div
                    className="border p-3 rounded-lg cursor-pointer flex items-center gap-2"
                    onClick={() => setPaymentMethod("Google Pay or Apple Pay")}
                  >
                    <span>🎁</span> Google Pay or Apple Pay
                  </div>
                </div>
              ) : paymentMethod === "Credit or Debit Card" ? (
                <form onSubmit={handleSavePayment}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      className="border p-2 w-full rounded-md text-black"
                      onChange={handleChangePayment}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM / YY"
                        className="border p-2 w-1/2 rounded-md text-black"
                        onChange={handleChangePayment}
                      />
                      <input
                        type="text"
                        name="securityCode"
                        placeholder="Security Code"
                        className="border p-2 w-1/2 rounded-md text-black"
                        onChange={handleChangePayment}
                      />
                    </div>
                    <select
                      className="border p-2 w-full rounded-md text-black"
                      name="country"
                      onChange={handleChangePayment}
                    >
                      <option value="Rwanda">Rwanda</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Nickname (optional)"
                      className="border p-2 w-full rounded-md text-black"
                      name="nickName"
                      onChange={handleChangePayment}
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2 w-full rounded-lg"
                    >
                      Add Card
                    </button>
                  </div>
                </form>
              ) : paymentMethod === "PayPal" ? (
                <div>
                  <p className="text-gray-600">
                    You will be re-directed to PayPal to verify your account.
                  </p>
                  <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 rounded-lg flex justify-center items-center text-lg">
                    PayPal
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    Complete your payment with Google Pay or Apple Pay.
                  </p>
                  <button className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-lg flex justify-center items-center text-lg">
                    Google Pay / Apple Pay
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <ToastContainer />

        {/* Map Panel */}
        <div className="w-full h-[300px] sm:h-[400px] lg:h-auto lg:w-full relative">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={currentLocation}
            zoom={10}
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && (
              <Polyline
                path={directionsResponse.routes[0].overview_path}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                  clickable: false,
                }}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>

        {/* container for set Time for Ride */}
        {showTimeModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowTimeModal(false);
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
              <h2 className="text-lg font-semibold mb-4">
                When do you want to be picked up?
              </h2>

              <div className="space-y-3">
                {/* Select Today / Later */}
                <div className="border rounded-lg p-3 bg-gray-100">
                  <select
                    className="bg-transparent focus:outline-none w-full text-gray-600"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    value={selectedOption}
                  >
                    <option value="Today">Today</option>
                    <option value="For Later">For Later</option>
                  </select>
                </div>

                {/* Show Time Input if "Today" is selected */}
                {selectedOption === "Today" && (
                  <div className="border rounded-lg p-3 bg-gray-100">
                    <input
                      type="time"
                      className="bg-transparent focus:outline-none w-full text-gray-600"
                      onChange={(e) => setSelectedTime(e.target.value)}
                      value={selectedTime}
                    />
                  </div>
                )}

                {/* Show Date Input if "For Later" is selected */}
                {selectedOption === "For Later" && (
                  <div className="border rounded-lg p-3 bg-gray-100">
                    <input
                      type="date"
                      className="bg-transparent focus:outline-none w-full text-gray-600"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate}
                    />
                  </div>
                )}
              </div>

              {/* Confirm Button */}
              <button
                className="mt-6 w-full bg-black text-white font-medium py-2 rounded-lg focus:outline-none"
                onClick={handleConfirmSelection}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* container for switch for Ride Type */}
        {showSwitchRider && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSwitchRider(false);
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
              <h2 className="text-lg font-semibold mb-4">Switch rider</h2>
              <div className="space-y-3">
                <div
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedRider === "Me" ? "bg-gray-100" : ""}`}
                  onClick={() => handleRiderChange("Me")}
                >
                  <IoIosPerson className="text-gray-600 mr-3" />
                  Me
                  {selectedRider === "Me" && (
                    <span className="ml-auto text-black">●</span>
                  )}
                </div>
                <div
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedRider === "Order ride for someone else" ? "bg-gray-100" : ""}`}
                  onClick={() =>
                    handleRiderChange("Order ride for someone else")
                  }
                >
                  <IoPersonAdd className="text-gray-600 mr-3" />
                  Order ride for someone else
                  {selectedRider === "Order ride for someone else" && (
                    <span className="ml-auto text-black">●</span>
                  )}
                </div>
              </div>
              <button
                className="mt-6 w-full bg-black text-white font-medium py-2 rounded-lg focus:outline-none"
                onClick={() => setShowSwitchRider(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideBooking;
