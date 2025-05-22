import { useEffect, useRef, useState } from 'react';
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import { FaDotCircle } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import DashboardNavbar from '../../components/DashboardNavbar';
import Loader from '../../components/Loading';
import { darkMapStyle, lightMapStyle } from "../../Utils/mapStyles";
import { calculateCustomRoute } from "../../Utils/calculateCustomRoute";
import { createRideReservation } from "../../Services/RequestRide/reservationService";
import PointImage from '../../assets/pin.png';

const ReservationForm = () => {
  // Form state management
  const [reservationData, setReservationData] = useState({
    customerFullName: "",
    customerEmail: "",
    customerPhone: "",
    pickupAddress: "",
    dropoffAddress: "",
    scheduledDateTime: "",
    numberOfPassengers: "",
  });

  // Map and route state
  const [mapInstance, setMapInstance] = useState(null);
const [routeDistance, setRouteDistance] = useState("");
  const [routeDuration, setRouteDuration] = useState("");
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
const [polylineRoutePath, setPolylineRoutePath] = useState([]);
  
  // UI state
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Refs for autocomplete inputs
  const pickupLocationRef = useRef();
  const dropoffLocationRef = useRef();

  // Google Maps API configuration
  const { isLoaded: isGoogleMapsLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_PLACES_API || "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries: ["places"]
  });

  // Check if required form fields are filled
  const isRequiredFieldsFilled = reservationData.pickupAddress && 
                                 reservationData.dropoffAddress && 
                                 reservationData.customerFullName && 
                                 reservationData.customerEmail && 
                                 reservationData.customerPhone;

  // Apply map theme based on dark mode setting
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setOptions({
        styles: isDarkModeEnabled ? darkMapStyle : lightMapStyle,
      });
    }
  }, [mapInstance, isDarkModeEnabled]);

  // Get user's current location on component mount
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        setCurrentUserLocation({ 
          lat: coords.latitude, 
          lng: coords.longitude 
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Set default location if geolocation fails
        setCurrentUserLocation({ lat: 40.7128, lng: -74.0060 }); // New York City
      }
    );
  }, []);

  /**
   * Handle place selection for pickup or dropoff locations
   * @param {string} locationType - Either "pickup" or "dropoff"
   */
  const handleLocationSelection = async (locationType) => {
    const autocompleteRef = locationType === "pickup" 
      ? pickupLocationRef.current 
      : dropoffLocationRef.current;
    
    const selectedPlace = autocompleteRef.getPlace();

    if (!selectedPlace.geometry || !selectedPlace.geometry.location) {
      console.warn("Selected place has no geometry information");
      return;
    }

    const selectedLatitude = selectedPlace.geometry.location.lat();
    const selectedLongitude = selectedPlace.geometry.location.lng();

    const updatedReservationData = {
      ...reservationData,
      [`${locationType}Address`]: selectedPlace.formatted_address || selectedPlace.name,
      [`${locationType}Latitude`]: selectedLatitude,
      [`${locationType}Longitude`]: selectedLongitude,
    };

    setReservationData(updatedReservationData);

    // Calculate route if both pickup and dropoff are selected
    if (
      updatedReservationData.pickupLatitude &&
      updatedReservationData.pickupLongitude &&
      updatedReservationData.dropoffLatitude &&
      updatedReservationData.dropoffLongitude
    ) {
      await calculateRouteInformation(updatedReservationData);
    }
  };

  /**
   * Calculate and display route information between pickup and dropoff
   * @param {Object} locationData - Contains pickup and dropoff coordinates
   */
  const calculateRouteInformation = async (locationData) => {
    try {
      await calculateCustomRoute({
        map: mapInstance,
        pickup: { 
          lat: locationData.pickupLatitude, 
          lng: locationData.pickupLongitude 
        },
        dropoff: { 
          lat: locationData.dropoffLatitude, 
          lng: locationData.dropoffLongitude 
        },
        setPolylinePath: setPolylineRoutePath,
        setDistance: setRouteDistance,
        setDuration: setRouteDuration,
      });
    } catch (error) {
      console.error("Route calculation error:", error);
    }
  };

  /**
   * Handle form input changes
   * @param {Event} event - Input change event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservationData(previousData => ({ 
      ...previousData, 
      [name]: value 
    }));
  };

  /**
   * Handle phone number change from PhoneInput component
   * @param {string} phoneNumber - Selected phone number
   */
  const handlePhoneNumberChange = (phoneNumber) => {
    setReservationData(previousData => ({ 
      ...previousData, 
      customerPhone: phoneNumber 
    }));
  };

  /**
   * Submit reservation form
   * @param {Event} event - Form submit event
   */
  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    
    if (!isRequiredFieldsFilled) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmittingForm(true);

    try {
      const reservationPayload = {
        ...reservationData,
        routeDistance,
        routeDuration,
        createdAt: new Date().toISOString(),
        status: "pending"
      };

      const response = await createRideReservation(reservationPayload);
      
      if (response.success) {
        alert("Ride scheduled successfully!");
        // Reset form after successful submission
        resetReservationForm();
      } else {
        throw new Error(response.message || "Failed to create reservation");
      }
    } catch (error) {
      console.error("Reservation submission error:", error);
      alert("Failed to book ride. Please try again.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  /**
   * Reset form to initial state
   */
  const resetReservationForm = () => {
    setReservationData({
      customerFullName: "",
      customerEmail: "",
      customerPhone: "",
      pickupAddress: "",
      dropoffAddress: "",
      pickupLatitude: null,
      pickupLongitude: null,
      dropoffLatitude: null,
      dropoffLongitude: null,
      scheduledDateTime: "",
      numberOfPassengers: "",
    });
    setPolylineRoutePath([]);
    setRouteDistance("");
    setRouteDuration("");
  };

  // Show loader while Google Maps is loading or location is being fetched
  if (!isGoogleMapsLoaded || !currentUserLocation) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className='overflow-hidden h-[100vh]'>
      <DashboardNavbar />
      
      <div className="flex flex-col lg:flex-row items-center justify-center p-5 -mt-10">
        {/* Reservation Form Section */}
        <div className="p-5 w-full lg:w-1/2">
          <form onSubmit={handleReservationSubmit} className="space-y-4">
            <h2 className="text-5xl capitalize w-[80%] leading-tight font-bold">
              Get ready for your first trip
            </h2>

            {/* Customer Information Row */}
            <div className='flex justify-between w-full gap-2'>
              <input 
                name="customerFullName" 
                placeholder="Full Name" 
                className="w-full p-3 bg-gray-200 rounded" 
                onChange={handleInputChange} 
                value={reservationData.customerFullName} 
                required 
              />
              <input 
                name="customerEmail" 
                placeholder="Email Address" 
                type="email" 
                className="w-full p-3 bg-gray-200 rounded" 
                onChange={handleInputChange} 
                value={reservationData.customerEmail} 
                required 
              />
            </div>

            {/* Phone Number Input */}
            <PhoneInput 
              country={'us'} 
              value={reservationData.customerPhone} 
              onChange={handlePhoneNumberChange} 
              inputClass="!w-full !bg-gray-200 p-6 !rounded !outline-none !border-none" 
              containerClass="!w-full" 
              buttonClass="!bg-gray-200 !border-none" 
              enableSearch 
              placeholder="Phone number" 
              required 
            />

            {/* Location Selection Row */}
            <div className='flex justify-between w-full gap-2'>
              {/* Pickup Location */}
              <div className='w-1/2'>
                <Autocomplete 
                  onLoad={ref => pickupLocationRef.current = ref} 
                  onPlaceChanged={() => handleLocationSelection("pickup")}
                >
                  <div className="flex items-center bg-gray-200 p-3 border-2 rounded w-full">
                    <FaDotCircle className="mr-2" />
                    <input
                      name="pickupAddress"
                      placeholder="Pickup Location"
                      className="w-full bg-transparent outline-none"
                      value={reservationData.pickupAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </Autocomplete>
              </div>

              {/* Dropoff Location */}
              <div className='w-1/2'>
                <Autocomplete 
                  onLoad={ref => dropoffLocationRef.current = ref} 
                  onPlaceChanged={() => handleLocationSelection("dropoff")}
                >
                  <div className="flex items-center bg-gray-200 p-3 rounded w-full">
                    <FaDotCircle className="mr-2" />
                    <input
                      name="dropoffAddress"
                      placeholder="Dropoff Location"
                      className="w-full bg-transparent outline-none"
                      value={reservationData.dropoffAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </Autocomplete>
              </div>
            </div>

            {/* Trip Details Row */}
            <div className='flex justify-between w-full gap-2'>
              <input 
                name="scheduledDateTime" 
                type="datetime-local" 
                className="w-full p-3 bg-gray-200 rounded" 
                value={reservationData.scheduledDateTime} 
                onChange={handleInputChange} 
                required 
              />
              <input 
                name="numberOfPassengers" 
                placeholder="Number of Passengers" 
                type="number" 
                min="1" 
                max="8" 
                className="w-full p-3 bg-gray-200 rounded" 
                onChange={handleInputChange} 
                value={reservationData.numberOfPassengers} 
                required 
              />
            </div>

            {/* Route Information Display */}
            {routeDistance && routeDuration && (
              <div className="text-sm text-gray-600">
                Distance: {routeDistance} | Duration: {routeDuration}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full p-3 rounded font-semibold transition-colors ${
                isRequiredFieldsFilled && !isSubmittingForm
                  ? "bg-[#293751] text-white hover:bg-gray-700" 
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`} 
              disabled={!isRequiredFieldsFilled || isSubmittingForm}
            >
              {isSubmittingForm ? "Scheduling..." : "Schedule Ride"}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="w-full lg:w-1/2 h-[460px] rounded-xl mt-16 lg:mt-4">
          <GoogleMap
            onLoad={map => setMapInstance(map)}
            center={currentUserLocation}
            zoom={14}
            mapContainerStyle={{ 
              width: "100%", 
              height: "430px", 
              borderRadius: "10px", 
              marginTop: "30px" 
            }}
            options={{ 
              styles: isDarkModeEnabled ? darkMapStyle : lightMapStyle 
            }}
          >
            {/* Route Polyline */}
            {polylineRoutePath.length > 0 && (
              <Polyline
                path={polylineRoutePath}
                options={{ 
                  strokeColor: "#070d1f", 
                  strokeWeight: 5 
                }}
              />
            )}

            {/* Pickup Location Marker */}
            {reservationData.pickupLatitude && reservationData.pickupLongitude && (
              <Marker
                position={{ 
                  lat: reservationData.pickupLatitude, 
                  lng: reservationData.pickupLongitude 
                }}
                icon={{
                  url: PointImage,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                label={{ 
                  text: "Pickup", 
                  color: "white", 
                  fontWeight: "bold" 
                }}
              />
            )}

            {/* Dropoff Location Marker */}
            {reservationData.dropoffLatitude && reservationData.dropoffLongitude && (
              <Marker
                position={{ 
                  lat: reservationData.dropoffLatitude, 
                  lng: reservationData.dropoffLongitude 
                }}
                icon={{
                  url: PointImage,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                label={{ 
                  text: "Dropoff", 
                  color: "white", 
                  fontWeight: "bold" 
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;