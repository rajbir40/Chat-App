import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import {authStore} from "./store/auth.Store.jsx"
import { useEffect } from 'react';
import {Loader} from "lucide-react";

const App = () => {
  console.log(authStore());
  const {authUser,checkAuth,isCheckingAuth} = authStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]) ;
  console.log({authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <Router>  {/* Wrap everything inside BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <h1>Home</h1> : <Navigate to="/login" />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
