/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const RefreshTableContext = createContext();

// Crear un proveedor de contexto
export const RefreshTableProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshClients, setRefreshClients] = useState(false)
  const [refresSales, setRefreshSales] = useState(false)

  useEffect(() => {
    refresh && setRefresh(false)
  }, [refresh])

  useEffect(() => {
    refreshClients && setRefreshClients(false)
  }, [refreshClients])

  useEffect(() => {
    refresSales && setRefreshSales(false)
  }, [refresSales])
  

  return (
    <RefreshTableContext.Provider value={{ refresh, setRefresh, refreshClients, setRefreshClients, refresSales ,setRefreshSales }}>
      {children}
    </RefreshTableContext.Provider>
  );
};

// Hook para usar el contexto
export const useRefreshTable = () => {
  return useContext(RefreshTableContext);
};
