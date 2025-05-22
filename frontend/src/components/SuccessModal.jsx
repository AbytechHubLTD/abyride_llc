/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div
      onClick={() => onClose(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center"
      >
        <CheckCircle className="text-green-500 mx-auto w-16 h-16" />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          Application Submitted!
        </h2>
        <p className="text-gray-600 mt-2">
          {" "}
          Your application has been successfully submitted. We will review it
          and get back to you soon.
        </p>
        <button
          onClick={() => {
            navigate("/");
            onClose(false);
          }}
          className="mt-6 px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all"
        >
          Okay
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
