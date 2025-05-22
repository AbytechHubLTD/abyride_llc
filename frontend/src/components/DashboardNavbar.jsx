import { Link } from "react-router-dom";
import React from "react";

function DashboardNavbar() {
  return (
    <nav className="bg-[#293751] p-4 w-full">
      <Link to='/' className="text-white text-xl font-bold "> ABYRIDE </Link>
    </nav>
  );
}

export default DashboardNavbar;
