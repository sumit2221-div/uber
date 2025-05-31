import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext';
import { getUserProfile } from '../api/api';

function ProtectedWrapper({ children }) {
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      nav('/login');
      return;
    }

    getUserProfile()
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data?.user);
          setLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem('accessToken');
        nav('/login');
        console.log(err);
      });
  }, [token, setUser, nav]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default ProtectedWrapper;
