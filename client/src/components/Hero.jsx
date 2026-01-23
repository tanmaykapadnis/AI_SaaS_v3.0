import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen"
     style={{ backgroundImage: `url('/src/assets/gradientBackground.png')` }}>

        <div className="text-center mb-6">
        <h1 className="text-xl text-white sm:text-2xl md:text-5xl 2xl:text-5xl font-semibold mx-auto leading-[1.2]">

        <span className="glow-text"> Design, write, and innovate <br /> seamlessly with</span> <span className="text-primary">AI tools</span>
            </h1>
            <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-300">Streamline your workflow with smart AI tools that create, design, and inspire.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
            <button onClick={() =>  navigate('/ai')} className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer">Start creating now</button>
            <button className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer text-black">Watch demo</button>
        </div>
        <div className="flex items-center gap-4 mt-8 mx-auto text-gray-300">
             
        </div>
    </div>
  );
};

export default Hero;
 