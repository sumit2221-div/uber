// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/'; // Change as needed
 const token = localStorage.getItem('accessToken');

// --- Captain APIs ---
export const registerCaptain = (data) =>
  axios.post(`${BASE_URL}/captain/register`, data);

export const loginCaptain = (data) =>
  axios.post(`${BASE_URL}/captain/login`, data);

export const getCaptainProfile = (token) =>
  axios.get(`${BASE_URL}/captain/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logoutCaptain = (token) =>
  axios.get(`${BASE_URL}/captain/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- User APIs ---
export const registerUser = (data) =>
  axios.post(`${BASE_URL}/user/register`, data);

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/user/login`, data);

export const getUserProfile = (token) =>
  axios.get(`${BASE_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logoutUser = (token) =>
  axios.get(`${BASE_URL}/user/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- Ride APIs ---
export const createRide = (data, token) =>
  axios.post(`${BASE_URL}/ride/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFare = (data, token) =>
  axios.post(`${BASE_URL}/ride/getFares`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const acceptRide = (data, token) =>
  axios.post(`${BASE_URL}/ride/accept`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const startRide = (data, token) =>
  axios.post(`${BASE_URL}/ride/start`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const endRide = (data, token) =>
  axios.post(`${BASE_URL}/ride/ended`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const makePayment = (data, token) =>
  axios.put(`${BASE_URL}/ride/payment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const seeRides = (requirement, token) =>
  axios.get(`${BASE_URL}/ride/seeRides?requirement=${requirement}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelRide = (data) =>
  axios.put(`${BASE_URL}/ride/cancelRide`, data);

export const sendSos = (data) =>
  axios.post(`${BASE_URL}/ride/sendSos`, data);

// --- Delivery APIs ---
export const createDelivery = (data, token) =>
  axios.post(`${BASE_URL}/delivery/createDelivery`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- Maps APIs ---
export const getCoordinates = (address) =>
  axios.get(`${BASE_URL}/maps/getCo-ordinates`, { data: { address } });

export const getDistance = (params) =>
  axios.get(`${BASE_URL}/maps/getDistance`, { params });

export const getSuggestions = (input, token) =>
  axios.post(`${BASE_URL}/maps/getSuggestion?input=${input}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });