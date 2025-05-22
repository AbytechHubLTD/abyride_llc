import { useState } from "react";
import {
  FaCreditCard,
  FaUser,
  FaHome,
  FaTruck,
  FaPlus,
  FaBell,
  FaLongArrowAltLeft,
} from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { useDriverAuth } from "../../../context/DriverAuthContext";

export default function DriverDashboard() {
  const [selectedTab, setSelectedTab] = useState("Billing");
  const [showNotifications, setShowNotifications] = useState(false);

  const { logout } = useDriverAuth();

  const handleLogout = async () => {
    try {
      const response = await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Abyride Driver</h2>

        <nav>
          <ul className="space-y-2">
            <li className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
              <FaHome className="mr-2" /> Home
            </li>
            <li className="p-2">
              <span className="text-gray-600">Requested Ride</span>
              <ul className="ml-4 space-y-2">
                <li className="cursor-pointer hover:underline">Today</li>
                <li className="cursor-pointer hover:underline">Future</li>
                <li className="cursor-pointer hover:underline">Past</li>
              </ul>
            </li>
            <li className="p-2 text-gray-600">Management</li>
            <li
              className="flex items-center p-2 cursor-pointer bg-gray-200 rounded-lg"
              onClick={() => setSelectedTab("Billing")}
            >
              <MdOutlinePayments className="mr-2" /> Driver Billing
            </li>
            <li className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
              <FaUser className="mr-2" /> Profile
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg"
              onClick={handleLogout}
            >
              <FaLongArrowAltLeft className="mr-2" /> logout
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold">Ride Requests</h1>
        <div className="w-full">
          <div className=" w-full  border-t pt-1">
            <table className="w-full border-collapse border border-gray-200 bg-white shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-600 font-semibold">
                  <th className="border p-3 text-left">Request ID</th>
                  <th className="border p-3 text-left">Pickup Location</th>
                  <th className="border p-3 text-left">Drop-off Location</th>
                  <th className="border p-3 text-left">Ride Time</th>
                  <th className="border p-3 text-left">Rider Type</th>
                  <th className="border p-3 text-left">Fare</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-500 text-center">
                  <td className="border p-3" colSpan="7">
                    No ride requests yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="top-4 right-4 border  bg-white shadow-lg rounded-full p-3 h-20 ">
        {/* Notification Icon */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FaBell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Notification Dropdown */}
      </div>
    </div>
  );
}
