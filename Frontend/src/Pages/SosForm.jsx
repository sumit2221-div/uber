import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function SosForm() {
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (err) => {
            setError("Unable to retrieve your location. Please enable location services.");
            console.error("Geolocation error:", err);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    getCurrentLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      setError("Location not available. Please enable location services.");
      return;
    }
    if (reason.trim()) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(
          `http://localhost:5000/ride/sendSos`,
          {
            rideId: state,
            latitude,
            longitude,
            reason: reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setMessage(response.data.Message);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to send SOS. Please try again."
        );
      }
    } else {
      alert("Please provide a reason for the SOS alert.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">SOS Alert</h2>
        <p className="mb-4">Please provide a reason for the SOS alert:</p>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 mb-4 border rounded-lg"
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason..."
          ></textarea>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              disabled={!latitude || !longitude}
            >
              Confirm SOS
            </button>
          </div>
        </form>
        <h2 className="mb-4 text-xl font-bold">{message}</h2>
      </div>
    </div>
  );
}

export default SosForm;
