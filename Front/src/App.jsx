import AppRoutes from './routes/appRoutes';
import { Toaster } from 'sonner';
import { NextUIProvider } from '@nextui-org/react';
import { ContextProvider } from './context/context';

function App() {
  return (
    <ContextProvider>
      <NextUIProvider>
        <AppRoutes />
        <Toaster expand={false} richColors autoClose={500}  position="top-center" />
      </NextUIProvider>
    </ContextProvider>
  );
}

export default App;
