import logo from "../../assets/imgs/NUpack/NUpakLogo.svg";
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { FaArrowLeft } from "react-icons/fa6";

/**
 * @Author : Daniel Salazar,   @date 2024-10-07 14:36:39
 * @description :Contenedor para presentar los formularios de autenticacione
 * @Props :children : recibe como tal el formulario 
 */

export const CardContainer = ({children, description, title, width, isRegisterForm}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-t from-purple-400 to-fuchsia-500'>
      <div className={`h-[calc(100%-50px)] max-h-[700px] bg-slate-100 w-[calc(100%-20px)] ${!width?'sm:w-1/2':'sm:w-3/4 p-5'} max-w-[800px] rounded-2xl shadow-medium flex flex-col`}>
        {isRegisterForm?(
          <div className='text-center flex gap-2 items-center pt-6'>
            <div className='flex text-start flex-col transition-all duration-700'>
              <h1 className='text-lg font-bold text-default-700'>{title}</h1>
              <p className='text-default-500'>{description}</p>
            </div>
        </div>
        ):(
          <div className='text-center flex sm:flex-col gap-2 justify-center items-center pt-6'>
            <div className='flex text-start sm:text-center flex-col transition-all duration-700'>
              <h1 className='text-lg sm:text-3xl font-bold text-default-700'>{title}</h1>
              <p className='text-default-500 px-3'>{description}</p>
            </div>
          </div>
        )}

        
        <div className="w-full h-full flex flex-col gap-3 overflow-auto p-2">
          {children}
        </div>
      </div>
    </div>
  );
};
