import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);

  const fetchUser = async () => {
    if(userData){
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data )); // wrap in `{ user: ... }` only if your reducer expects it
    } catch (err) {
      if(err.status===401){
        navigate("/login")
      }
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
