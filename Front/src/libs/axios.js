

const apiLocal= import.meta.env.VITE_API_URL;


export const URL_API = apiLocal


import axios from 'axios';

export const getData = async (endpoint) => {
    try {
      const response = await axios.get(`${URL_API}/${endpoint}`);      
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  };

  export const getDataWithReq = async (endpoint, req) => {
    try {
      const response = await axios.post(`${URL_API}/${endpoint}`, req);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  };
  
  // Función POST general para enviar datos a la API
  export const postData = async (endpoint, data) => {
    try {
      const response = await axios.post(`${URL_API}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  };
  
  // Función PUT general para actualizar datos en la API
  export const putData = async (endpoint, data) => {
    try {
      const response = await axios.put(`${URL_API}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data on ${endpoint}:`, error);
      throw error;
    }
  };
  
  // Función DELETE general para eliminar datos en la API
  export const deleteData = async (endpoint) => {
    try {
      const response = await axios.delete(`${URL_API}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data from ${endpoint}:`, error);
      throw error;
    }
  };