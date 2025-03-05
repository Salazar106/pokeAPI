import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowRight, FaArrowLeftLong  } from "react-icons/fa6"; //? row left and right icons


const AuthSwitcher = ({ text, to }) => {
    if (to === "/auth/register") {
        return (
            <div className='flex flex-col gap-2  w-full items-center '>
                <div className='sm:hiddenborder-t-2 border-gray-300'></div>
                <Link to={to} className="flex items-center justify-center gap-2 w-28 text-primary hover:scale-105 transition-all duration-300">
                    {text} 
                    <FaArrowRight />
                </Link>
            </div>
        );
    }else{
        return (
            <div className='flex flex-col  items-center w-full'>
                <div className='border-t-2 border-gray-300'></div>
                <Link to={to} className="flex items-center justify-center gap-2 text-primary w-32 hover:scale-110 transition-all duration-300">
                    {text} 
                    <FaArrowLeftLong />
                </Link>
            </div>
        );
    }
};

export default AuthSwitcher;
