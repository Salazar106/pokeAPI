
import React from 'react';
import noDataFound from '../assets/tables/noDataFound.png'
/**
 * @Author : Daniel Salazar,   @date 2024-10-09 09:19:00
 * @description :
 * @Props :
 */

export const NoFoundDataTable = ({modulo}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <img src={noDataFound} className='w-64' alt="no data" />
      <h1>No se Encontro información de {modulo}</h1>
    </div>
  );
};
