import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../Context/CaptainContext';
import { getCaptainProfile } from '../api/api'; // Use your API helper

function CaptainProtected({ children }) {
  const token = localStorage.getItem('accessToken'); // Use accessToken for consistency
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      nav('/capLogin');
      return;
    }

    getCaptainProfile()
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.cap);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('accessToken');
        nav('/capLogin');
      });
  }, [token, nav, setCaptain]);

  if (loading) {
    return <h1>Loading.....</h1>;
  }
  return <>{children}</>;
}

export default CaptainProtected;
