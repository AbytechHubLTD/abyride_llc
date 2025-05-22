import React, { useState, useEffect, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import carimage from '../assets/abyride x.png'
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
import { data, useNavigate } from "react-router-dom";

import { FaDotCircle, FaUser } from "react-icons/fa";
import RequestRideService, { convertTimeToDateTime } from "../Services/ClientProcess/requestRide/RequestRideService";
import { ArrowLeft, CheckCircle, User } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const libraries = ["places"];

// Define the black map style
const blackMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

const API_URL = import.meta.env.VITE_API_URL

const RideBooking = () => {
  // Load Google Maps API with useLoadScript
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACES_API || "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE", // Replace with your API key
    libraries: libraries,
  });

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
  const [isConfirmed, setIsConfirmed] = useState(null)

  const [showSwitchRider, setShowSwitchRider] = useState(false);
  const [selectedRider, setSelectedRider] = useState("Me");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [occuringRide, setOccuringRide] = useState(null)

  const [availableDriver, setAvailableDriver] = useState([

  ])

  const [currentStep, setCurrentStep] = useState(1)
  const [valid, setValid] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [geocoder, setGeocoder] = useState(null);

  const [finalSelection, setFinalSelection] = useState("Pick Time");

  // Refs for autocomplete inputs
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  // Add this state to track if we should show the current location marker
  const [showCurrentLocationMarker, setShowCurrentLocationMarker] = useState(false);

  // Get current location using geolocation
  const isFormFilled = formData.pickup.trim() !== "";


  useEffect(() => {
    const verifyThePayment = async () => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);


      const sessionId = params.get('sessionId')
      

      if (sessionId) {
        params.delete('sessionId')
        params.delete('sessionId');
        window.history.replaceState({}, '', `${url.pathname}?${params}`);
        setValid(pre=>(
          {...pre,"2":true,"1":true}
        ))
        setCurrentStep(3)

        try {
          const response = await RequestRideService.confirmPayment(sessionId);
          if (response?.rideId) {
            setValid(pre => ({ ...pre, "4": true }));
            setCurrentStep(4);
          }
        } catch (error) {
          console.error("Payment confirmation failed:", error);
        }
        
      }else{
        setCurrentStep(1)

      }

    }
    verifyThePayment()

  }, [])

  // Initialize geocoder when maps API is loaded
  useEffect(() => {
    if (isLoaded && !geocoder) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [isLoaded, geocoder]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Get current location and set as pickup
  useEffect(() => {
    if (!geocoder) return; // Wait until geocoder is available

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentCoords = { lat: latitude, lng: longitude };
          setCurrentLocation(currentCoords);
          setPickupCoords(currentCoords);

          // Set this to true to show the marker on the map
          setShowCurrentLocationMarker(true);

          // Update form data with coordinates
          setFormData(prev => ({
            ...prev,
            pickLat: latitude,
            pickLong: longitude,
          }));

          // Use reverse geocoding to get address
          geocoder.geocode({ location: currentCoords }, (results, status) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              setFormData(prev => ({
                ...prev,
                pickup: address
              }));
            }
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco
    }
  }, [geocoder]);

  // Calculate route whenever pickup or dropoff coordinates change
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      calculateRoute();
    }
  }, [pickupCoords, dropoffCoords]);

  const handlePlaceSelect = (type) => {
    let place = null;

    if (type === "pickup" && pickupRef.current) {
      place = pickupRef.current.getPlace();
    } else if (type === "dropoff" && dropoffRef.current) {
      place = dropoffRef.current.getPlace();
    }

    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      if (type === "pickup") {
        setPickupCoords({ lat: lat(), lng: lng() });
        setFormData(prev => ({
          ...prev,
          pickLat: lat(),
          pickLong: lng(),
          pickup: place.formatted_address || place.name
        }));
      } else {
        setDropoffCoords({ lat: lat(), lng: lng() });
        setFormData(prev => ({
          ...prev,
          dropLat: lat(),
          dropLong: lng(),
          dropoff: place.formatted_address || place.name
        }));
      }
    }
  };
  const validateForm = () => {
    const errors = {};

    // Validate pickup location
    if (!formData.pickup || formData.pickup.trim() === "") {
      errors.pickup = "Please enter a pickup location";
    }

    // Validate dropoff location
    if (!formData.dropoff || formData.dropoff.trim() === "") {
      errors.dropoff = "Please enter a dropoff location";
    }

    // Validate coordinates (ensure places were selected properly)
    if (!formData.pickLat || !formData.pickLong) {
      errors.pickupCoords = "Please select a valid pickup location";
    }

    if (!formData.dropLat || !formData.dropLong) {
      errors.dropoffCoords = "Please select a valid dropoff location";
    }

    // Validate pickup time
    if (!formData.pickTime || formData.pickTime === "Pick Time") {
      errors.pickTime = "Please select a pickup time";
    } else {
      // Validate that the time is in the future
      const selectedTime = new Date(formData.pickTime);
      const now = new Date();

      if (selectedTime <= now) {
        errors.pickTime = "Pickup time must be in the future";
      }
    }

    let isValid = Object.keys(errors).length === 0
    if (isValid) {
      setValid(pre => (
        { ...pre, '1': true }
      ))

    }

    // Return errors object and a boolean indicating if form is valid
    return {
      errors,
      isValid
    };
  };

  // useEffect(() => {


  //   validateForm()


  // }, [formData])

  // Calculate route between pickup and dropoff
  const calculateRoute = async () => {
    if (!pickupCoords || !dropoffCoords || !isLoaded) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: pickupCoords,
        destination: dropoffCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Direction service failed:", error);
      setDirectionsResponse(null)
      toast.error("Could not calculate route");
    }
  };

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle rider change
  const handleRiderChange = (rider) => {
    setSelectedRider(rider);
    setFormData((prev) => ({ ...prev, pickPerson: rider }));
    setShowSwitchRider(false);
  };

  // 1. Properly set initial time to current time plus 15 minutes
  useEffect(() => {
    const now = new Date();
    // Add 15 minutes to current time to give user reasonable buffer
    now.setMinutes(now.getMinutes() + 15);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    setSelectedTime(`${hours}:${minutes}`);

    // Also set a default date for the "For Later" option
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().slice(0, 16)); // Format: YYYY-MM-DDTHH:MM
  }, []);

  // 2. Define the convertTimeToDateTime function that's referenced but missing
  const convertTimeToDateTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();

    // Set the hours and minutes from the timeString
    now.setHours(hours, minutes, 0, 0);

    // If the time is in the past, set it to tomorrow
    if (now < new Date()) {
      now.setDate(now.getDate() + 1);
    }

    return now.toISOString();
  };

  // 3. Improved time validation in handleConfirmSelection
  const handleConfirmSelection = (e) => {
    e.stopPropagation(); // Prevents modal from closing unexpectedly

    const now = new Date();
    let selectedValue = "";
    let isValid = true;

    if (selectedOption === "Now") {
      // Parse the selected time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const selectedDateTime = new Date();
      selectedDateTime.setHours(hours, minutes, 0, 0);

      // Check if the time is in the future
      if (selectedDateTime <= now) {
        toast.error("Please select a future time for today", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        isValid = false;
      } else {
        selectedValue = `Today at ${selectedTime}`;
      }
    } else {
      // Parse the selected date
      const selectedDateTime = new Date(selectedDate);

      // Check if the date is valid and in the future
      if (isNaN(selectedDateTime.getTime()) || selectedDateTime <= now) {
        toast.error("Please select a valid future date and time", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        isValid = false;
      } else {
        // Format date nicely
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };
        selectedValue = `For Later on ${selectedDateTime.toLocaleDateString('en-US', options)}`;
      }
    }

    if (isValid) {
      // Update state properly
      setFinalSelection(selectedValue);
      setFormData((prev) => ({
        ...prev,
        pickTime: selectedOption === 'Today'
          ? convertTimeToDateTime(selectedTime)
          : new Date(selectedDate).toISOString()
      }));
      setShowTimeModal(false);
    }
  };

  const getMinTimeForInput = () => {
    const now = new Date();
    // Add 5 minutes to ensure the time is slightly in the future
    now.setMinutes(now.getMinutes() + 5);
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  
  
  };




 // Handle form submission
  const handleSubmitPhaseOne = async (e) => {
    e.preventDefault();

    console.log(formData);

  const {isValid,errors} =  validateForm()

  if (!isValid) {
    // Display each error as a separate toast
    const errorMessage = Object.values(errors)[0]
    toast.error(errorMessage, {
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

  if(!directionsResponse){
    return toast.error('can not find the direction route', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }

    try {

      const response = await RequestRideService.requestRide(formData)

      if (response.data) {
        setAvailableDriver(pre => (
          [...response.data.nearbyDrivers]
        ))
        setOccuringRide(response.data.ride)
        nextStep()
      }


    } catch (error) {
      console.error(error);

    }

  };

  // element for time model 
  const elementForTimeModel = () => {
    const minTime = `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`;

    return (
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
                <option value="Now">Now</option>
                <option value="For Later">For Later</option>
              </select>
            </div>

            {/* Show Time Input if "Today" is selected */}
            {selectedOption === "Now" && (
  <div className="border rounded-lg p-3 bg-gray-100">
    <input
      type="time"
      className="bg-transparent focus:outline-none w-full text-gray-600"
      value={getCurrentTime()}
      readOnly
    />
  </div>
)}



            {/* Show Date Input if "For Later" is selected */}
            {selectedOption === "For Later" && (
              <div className="border rounded-lg p-3 bg-gray-100">
                <input
                  type="datetime-local"
                  className="bg-transparent focus:outline-none w-full text-gray-600"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate}
                  min={new Date().toISOString().slice(0, 16)}
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
    )
  }

  // for switching 
  const elementForSwitchRiders = () => {
    return (
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
              className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedRider === "Me" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleRiderChange("Me")}
            >
              <IoIosPerson className="text-gray-600 mr-3" />
              Me
              {selectedRider === "Me" && (
                <span className="ml-auto text-black">●</span>
              )}
            </div>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedRider === "someone else" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleRiderChange("someone else")}
            >
              <IoPersonAdd className="text-gray-600 mr-3" />
              Order ride for someone else
              {selectedRider === "someone else" && (
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
    )
  }


  //  the Phase 1 :  request ride
  const ElementForFormOFRequestingRide = () => {
    return (
      <div className="p-2 justify-center flex lg:w-1/2 xl:w-1/3  ">
        {/* REQUEST RIDE FORM */}
        <form onSubmit={handleSubmitPhaseOne} className="p-3 w-full md:w-8/12 lg:w-full rounded">
          <h2 className="flex font-bold text-3xl md:text-4xl md:text-center">
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
                className="w-full"
              >
                <input
                  name="pickup"
                  id="pickup"
                  type="text"
                  placeholder="Pickup location"
                  className="bg-transparent focus:outline-none w-full text-black placeholder-black"
                  onChange={handleChange}
                  value={formData.pickup}
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
                className="w-full"

              >
                <input
                  name="dropoff"
                  type="text"
                  placeholder="Dropoff location"
                  className="bg-transparent focus:outline-none w-full text-black placeholder-black"
                  onChange={handleChange}
                  value={formData.dropoff}
                />
              </Autocomplete>
            </div>
          </div>

          <div className="flex gap-2 mt-2.5">
            {/* Pickup Time */}
            <div
              className="flex items-center rounded-lg p-3 gap-1 w-full bg-[#e9e9e9] cursor-pointer"
              onClick={() => setShowTimeModal(true)}
            >
              <IoTimeSharp className="text-gray-900 size-6" />
              <div
                className="bg-transparent focus:outline-none w-full text-gray-900"
                name="pickTime"
                readOnly
                disabled
                value={finalSelection}
              >
                <p value={finalSelection}>{finalSelection}</p>
              </div>
            </div>
            {/* For Me */}
            <div
              className="flex items-center rounded-lg p-2 w-full gap-1 bg-[#e9e9e9] cursor-pointer"
              onClick={() => setShowSwitchRider(true)}
            >
              <span className="material-icons text-gray-900">
                <IoPerson className="size-4" />{" "}
              </span>
              <div
                className="bg-transparent focus:outline-none w-full text-black"
                name="pickPerson"
                value={formData.pickPerson}
                readOnly
              >
                <p value={formData.pickPerson}>{formData.pickPerson}</p>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className={`mt-4 w-full p-2.5 font-medium rounded-lg focus:outline-none ${isFormFilled
              ? "bg-black text-white"
              : "bg-[#293751] text-white"
              }`}
          >
            Search
          </button>

          {/* Show route info if available */}
          {distance && duration && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Duration:</strong> {duration}</p>
            </div>
          )}
        </form>
      </div>

    )
  }

  // the phase 2 : choose avalaibale driver

  const ElementForChooseAvailableDriver = () => {

    const handleDriverSelect = (driverId) => {
      setSelectedDriver(driverId);
    };

    const getDataOfDriver = (driverId) => {
      return availableDriver.find(driver => driver.id == driverId)
    }

    const selected_driver = getDataOfDriver(selectedDriver)

    const handlePayment = () => {
      Swal.fire({
        title: 'Confirm your payment',
        text: "You must confirm your payment. do you wish to confirm it?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Confrim',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {




            const response = await axios.post(`${import.meta.env.VITE_API_URL}/ride/web-payment`, {
              amount: Number(selected_driver?.amount),
              rideId: occuringRide?.id,
              driverId: selected_driver?.id,

            }, { withCredentials: true })

            console.log(response.data);

            if (response.data.url) {
              window.location.href = response.data.url
              localStorage.setItem('sessionId', response.data.sessionId)
            }

          } catch (error) {
            console.log(error);

          }

        } else {
          // user clicked "No" or closed the alert
          console.log("User clicked NO or closed");
        }
      });
    }

    const span = 'capitalize font-semibold'

    return (
      <div className="p-2  flex-col min-h-[40vh] gap-3 rounded-md  border border-gray-200 flex lg:w-1/2 xl:w-1/3   ">
        <div className="p-2  flex-col w-full gap-3 h-[70%] rounded-md flex   ">
          <div className="flex items-center ">
            <ArrowLeft className="w-10 h-10" onClick={() => prevStep()} />
            <h1 className="text-2xl lg:text-3xl">Choose your Driver :{ }</h1>
          </div>

          {
            availableDriver.length > 0 ?
              <>

                <div className="flex gap-3 p-2 border bg-white min-h-[35vh] border-neutral-100  overflow-y-auto flex-col break-all">
                  {availableDriver.map((driver, key) => (
                    <div
                      className={`flex border justify-between bg-white ${selectedDriver === driver.id ? 'border-black shadow-md' : 'border-gray-200'
                        } hover:border-gray-400 cursor-pointer rounded-md p-4`}
                      key={key}
                      tabIndex={0}
                      role="option"
                      aria-selected={selectedDriver === driver.id}
                      onClick={() => handleDriverSelect(driver.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleDriverSelect(driver.id);
                          e.preventDefault();
                        }
                      }}
                    >
                      <img src={carimage} className="w-20 h-10 object-cover" alt={`${driver.carname} ${driver.carmodel}`} />

                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium">{driver.carname}</h3>
                        <p className="text-gray-600">{driver.carmodel}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <span>{driver.carCapacity}</span>
                          <FaUser className="h-3 w-3" />
                        </div>
                      </div>

                      <div className="font-bold text-lg">{driver.price}</div>
                    </div>
                  ))}

                </div>

                {selectedDriver && (
                  <div className="mt-4 p-3 bg-neutral-50 border flex-col flex items-center gap-2 border-neutral-200 rounded-md">
                    <h1 className="text-xl  text-neutral-800">
                      You have selected a vehicle! Click ContinuE to proceed with your booking.
                    </h1>

                    <div className="flex flex-col  items-center">

                    {selected_driver?.profileImg ? (
            <img
              src={`${API_URL}/uploads/profile/${selected_driver?.profileImg}`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            ""
          )}
                      
                    <h1>
                      <span className={span}>driver name:</span> {selected_driver?.firstName + ' ' + selected_driver?.lastName}
                    </h1>
                    </div>

                    <h1>
                      <span className={span}>driver email:</span> {selected_driver?.email}
                    </h1>
                    <h1>
                      <span className={span}>driver phone:</span> {selected_driver?.phone}
                    </h1>
                    <h1>
                      <span className={span}>Make:</span> {selected_driver?.carname}
                    </h1>
                    <h1>
                      <span className={span}>:</span> {selected_driver?.carmodel}
                    </h1>
                    <h1>
                      <span className={span}>model:</span> {selected_driver?.carmodel}
                    </h1>
                    <h1>
                      <span className={span}>car palate:</span> {selected_driver?.carpalate}
                    </h1>
                    <h1>
                      <span className={span}>car color:</span> {selected_driver?.carColor}
                    </h1>

                    <div className="flex justify-center flex-wrap gap-2 w-full items-center">

                      {
                        selected_driver?.carPhotos.map((photo, key) => {
                          // eslint-disable-next-line react/jsx-key
                          return <img loading="lazy" src={`${import.meta.env.VITE_API_URL}/uploads/carimages/${photo}`} className=" flex-auto w-1/3 rounded lg:w-1/4 h-32 object-center object-cover" alt={`${photo} ${key}`} />
                        })
                      }

                    </div>

                    <button
                      className="mt-2 bg-neutral-600 w-full text-white px-4 py-2 rounded-md hover:bg-neutral-700"
                      onClick={() => handlePayment()}

                    >
                      Continue
                    </button>



                  </div>
                )}

                {distance && duration && (
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p><strong>Distance:</strong> {distance}</p>
                    <p><strong>Duration:</strong> {duration}</p>
                  </div>
                )}
              </>
              : <div className="flex flex-col justify-evenly h-full  items-center">
                <h1 className="text-red-400">there is no avalaibale drivers</h1>
                <button className="disabled:opacity-70 p-2 capitalize disabled:cursor-default cursor-pointer text-white w-1/3 bg-black" onClick={prevStep} >go back</button>

              </div>
          }

        </div>

      </div>
    )
  }


  // the phase 3 : verify the payment

  const ElementForVerifyingThePayment = () => {



    return (
     

         <div className="flex flex-col items-center  w-full  lg:w-1/2 xl:w-1/3 justify-center gap-8  bg-slate-100">
        <h1 className="text-2xl">Verifying the payment</h1>
       <div className="flex flex-col items-center w-full">
        <div className="w-16 h-16 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-4  text-gray-700">Processing Payment...</p>
        </div>
      </div>

      
    )

  }

  const ElementForShowingFinishedBookingRide = () => {



    return (
     

         <div className="flex flex-col items-center  w-full  lg:w-1/2 xl:w-1/3 justify-center gap-8  bg-slate-100">
        <div className="flex flex-col items-center space-y-3">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">Payment Successful!</h2>
          <p className="text-sm text-gray-600">Thank you for your purchase.</p>
        </div>
      
      </div>

      
    )

  }




  // the not found step or phase

  const ElementForNotFoundPhase = () => {
    return (

      <div className="flex justify-center items-center gap-5">

        <h1 className="text-2xl">this phase not found</h1>
        <button className="p-2 px-4 bg-black round-md">go back</button>

      </div>

    )
  }

  const nextStep = () => {
    // Add validation before moving to next step
    if (validateCurrentStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
      console.log(`working`);
    }
    console.log(`validation failed`);
  };



  // Move to previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return valid["1"];
      case 2:
        return valid["2"];
      case 3:
        return valid["3"];
      case 4:
        return valid["4"];
      default:
        return true;
    }
  };


  const TrafficManagerOfElement = () => {
    switch (currentStep) {
      case 1:
        return ElementForFormOFRequestingRide();
      case 2:
        return ElementForChooseAvailableDriver();
      case 3:
        return ElementForVerifyingThePayment();
      case 4:
        return ElementForShowingFinishedBookingRide();

      default:
        return ElementForNotFoundPhase()
    }
  }



  // Return loading state while Google Maps script is loading
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading Google Maps...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-1 sm:p-5 lg:p-4">
      <div className="flex flex-col h-full lg:flex-row w-full md:justify-center p-3 sm:p-5 gap-16 rounded-lg relative md:p-8 md:gap-12 sm:gap-1 overflow-hidden xl:w-[4/7]">
        {/* Form Panel */}

        {
          TrafficManagerOfElement()
        }

        {/* container for set Time for Ride */}
        {showTimeModal && currentStep == 1 &&
          elementForTimeModel()
        }

        {/* container for switch for Ride Type */}
        {showSwitchRider && currentStep == 1 &&
          elementForSwitchRiders()
        }

        {/* Map Display */}
        <div className=" w-full h-[60vh] lg:h-[70vh] xl:h-[80vh] lg:w-1/2 xl:w-2/3">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '12px' }}
              center={currentLocation}
              zoom={17}
              options={{
                styles: blackMapStyle,
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
              }}
            >
              {/* Show marker at current location */}
              {showCurrentLocationMarker && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  title="Your current location"
                />
              )}

              {/* Display the route */}
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}

                  options={{

                    polylineOptions: {
                      strokeColor: 'yellow', // Change route line to white for better visibility on dark map
                      strokeWeight: 2.5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default RideBooking;
