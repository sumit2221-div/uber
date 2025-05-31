import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../Components";
import { LiveTracking } from "../Components";
import { endRide } from "../api/api"; // Use your API helper

function CaptainRidingPage(props) {
  const { state } = useLocation();
  const { ride, user } = state || {};
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const onCompleteRide = async () => {
    try {
      await endRide({ rideId: ride._id }); // API helper uses accessToken from localStorage
      setIsComplete(true);
      navigate("/caphome");
    } catch (error) {
      console.error("Error completing ride:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <Header />

        <LiveTracking />

        {/* Ride Info */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mx-4 -mt-20 bg-white rounded-lg shadow-lg"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{ride.distance} Km</h2>
                <p className="text-gray-500">remaining</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{ride.duration} min</p>
                <p className="text-gray-500">arrival</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold">Passenger {user.fullname.firstname}</h3>
            <p className="text-gray-500">Destination: {ride.destination}</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="p-4 mt-4 bg-white shadow-lg"
        >
          <button
            onClick={onCompleteRide}
            className="flex items-center justify-center w-full py-3 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Complete Ride
          </button>
        </motion.footer>
      </div>
    </>
  );
}

export default CaptainRidingPage;
