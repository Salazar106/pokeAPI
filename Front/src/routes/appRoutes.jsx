import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/loginPage';
import { RegisterPage } from '../pages/auth/registerForm';
import { RecoverPasswordPage } from '../pages/auth/recoverPassword';
import { ForgotPasswordPage } from '../pages/auth/forgotPasswordPage';
import LayoutAdmin from '../pages/admin/layout';

import { ProfilePage } from '../pages/profile';
import { PageNotFound } from '../pages/pageNotFound';
import { MyContext } from '../context/context';
import { useContext } from 'react';
import SearchByName from '../pages/searchByName';
import SearchById from '../pages/searchById';
// Componente PrivateRoute con validación de autenticación
const PrivateRoute = ({ element, meta = [] }) => {
  const { accessToken } = useContext(MyContext);
  const isAuthenticated = !!accessToken;

  // Redirige al login si se requiere autenticación y el usuario no está autenticado
  if (meta.includes('REQUIRES_AUTH') && !isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  // Verifica si el usuario está autenticado y la ruta debe ocultarse
  if (meta.includes('HIDE_FOR_AUTH') && isAuthenticated) {
    return <Navigate to='/pokeApi' replace />;
  }

  // Retorna el componente si pasa todas las validaciones
  return element;
};

// Configuración de las rutas de la aplicación
const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path='/' element={<PrivateRoute element={<LoginPage />} meta={['HIDE_FOR_AUTH']} />} />

      {/* Rutas de autenticación */}
      <Route path='/auth/login' element={<PrivateRoute element={<LoginPage />} meta={['HIDE_FOR_AUTH']} />} />
      <Route path='/auth/register' element={<PrivateRoute element={<RegisterPage />} meta={['HIDE_FOR_AUTH']} />} />
      <Route path='/auth/forgotPassword' element={<PrivateRoute element={<ForgotPasswordPage />} meta={['HIDE_FOR_AUTH']} />} />
      <Route path='/auth/restorePassword' element={<PrivateRoute element={<RecoverPasswordPage />} meta={['HIDE_FOR_AUTH']} />} />

      {/* Rutas protegidas */}
      <Route path='/pokeApi'>
        <Route element={<LayoutAdmin />}>
          <Route path='searchByName' element={<PrivateRoute element={<SearchByName />} meta={['REQUIRES_AUTH']} />} />
          <Route path='searchByID' element={<PrivateRoute element={<SearchById />} meta={['REQUIRES_AUTH']} />} />
          <Route path='History' element={<PrivateRoute element={<SearchById />} meta={['REQUIRES_AUTH']} />} />
         
          <Route path='profile' element={<PrivateRoute element={<ProfilePage />} meta={['REQUIRES_AUTH']} />} />
        </Route>
      </Route>

      {/* Ruta para páginas no encontradas */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;