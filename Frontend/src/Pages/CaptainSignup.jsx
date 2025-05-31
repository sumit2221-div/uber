import React, { useContext, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Header from '../Components/Header';
import { CaptainDataContext } from '../Context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import { registerCaptain } from '../api/api'; // Use your API helper

function CapSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [color, setColor] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState(Number(1));
  const nav = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCap = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        vehicleType: vehicleType,
        plate: plate,
        capacity: capacity,
      },
    };

    try {
      const response = await registerCaptain(newCap);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.newCap);
        localStorage.setItem('accessToken', data.token); // Use accessToken for consistency
        nav('/capLogin');
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Registration failed');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setColor('');
    setVehicleType('');
    setPlate('');
    setCapacity(1);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <form className="w-full max-w-sm p-6" onSubmit={handleSubmit}>
          <h2 className="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Welcome Aboard New Captain
          </h2>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vehicle Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Color"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vehicle Type
              </label>
              <select
                name="type"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Car">Car</option>
                <option value="Bike">Auto</option>
                <option value="Truck">Motorcycle</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vehicle Plate
              </label>
              <input
                type="text"
                name="plate"
                id="plate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Plate Number"
                required
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vehicle Capacity
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Capacity"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="1"
              />
            </div>
          </div>

          <div className="relative mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeIcon
                  className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 cursor-pointer right-2 top-1/2 dark:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOffIcon
                  className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 cursor-pointer right-2 top-1/2 dark:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create a new Account
          </button>
        </form>
      </div>
    </>
  );
}

export default CapSignup;
