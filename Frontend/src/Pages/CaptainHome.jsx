import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, User, CheckCircle } from 'lucide-react';
import { DriverAcceptRide, Header } from '../Components';
import { CaptainContext, CaptainDataContext } from '../Context/CaptainContext';
import { SocketContext } from '../Context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { logoutCaptain } from '../api/api'; // Import your API helper

function CaptainHome() {
  const [rides, setRides] = useState({});
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!captain?._id) return;

    socket.emit('join', { userId: captain._id, role: "captain" });

    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
          socket.emit('update-location', {
            id: captain._id,
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            }
          });
        });
      }
    };

    const locationDelay = setInterval(sendLocation, 1000);
    return () => clearInterval(locationDelay);
  }, [captain, socket]);

  useEffect(() => {
    socket.on('new-ride', (data) => {
      setRides(data);
    });
    // Clean up the event listener on unmount
    return () => {
      socket.off('new-ride');
    };
  }, [socket]);

  const handleLogout = async () => {
    try {
      await logoutCaptain();
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem('accessToken');
    nav('/capLogin');
  };

  return (
    <>
      <Header />
      <button
        onClick={handleLogout}
        className="absolute px-4 py-2 text-white transition-colors bg-red-500 rounded-md top-4 right-4 hover:bg-red-600"
      >
        Logout
      </button>

      {rides && <DriverAcceptRide rideData={rides} />}
      <div className="max-w-3xl p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Available Ride Requests</h1>
      </div>
    </>
  );
}

export default CaptainHome;
