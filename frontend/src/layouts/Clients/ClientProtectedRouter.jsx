import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProtectedTopBar from "../../components/ProtectedRoutes/ProtectedTopBar";

const ClientProtectedLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col flex-1">
        <ProtectedTopBar user={user} />
        <main className="p-4 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientProtectedLayout;
