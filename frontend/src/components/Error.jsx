import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Error = () => {
  return (
    <>
      <Navbar />
      <div className="Error mt-[160px] h-[calc(50vh-64px)] flex flex-col justify-center items-center bg-#FE7E7E">
        <h1 className="text-5xl font-bold text-[#5B5656] mb-4">Oops!!</h1>
        <h2 className="text-4xl font-bold text-[#5B5656] mb-8">Something Went Wrong!!!!</h2>
        <h3 className="text-3xl font-bold text-[#5B5656] mb-4">404 - Page Not Found</h3>
        <p className="text-2xl text-[#5B5656] mb-16">The page you're looking for doesn't exist.</p>
        <Link to="http://localhost:3000/notes" className="font-bold text-[#5B5656]">Go to Home</Link>
        
      </div>
      <Footer />
    </>
  );
};

export default Error;
