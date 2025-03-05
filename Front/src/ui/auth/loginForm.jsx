import { useContext, useState } from 'react';
import { MyContext } from '../../context/context';
import { validationSchemaLogin } from '../../libs/auth/login';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { IoIosMail } from 'react-icons/io';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import AuthSwitcher from '../../ui/authSchert';
import { toast } from 'sonner';
import { Spinner } from '@nextui-org/react';

export const LoginForm = () => {
  const { $Auth, setAccessToken, setActualUser, accessToken } = useContext(MyContext); // Accede al contexto
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  
  const handleResentEmail = async (email)=> {
    try {
        setLoading(true)
        const response = await $Auth.resentEmailVerificationAcount(email);
        toast.success(response.data.message);
    } catch (error) {
        console.error("Error during resend email:", error);
        toast.error(error.response.data.error);
    }finally{
      setLoading(false)
    }
  }

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
        const response = await $Auth.login(values.email, values.password);
        const { user } = response.data;
        console.log(response);
        
        setAccessToken(response.data.user.accessToken);
        setActualUser(user); 
        toast.success(response.data.message);
        resetForm();
    } catch (error) {
        console.error("Error during login:", error);
        if(error.response.data.message==='Tu cuenta no está verificada. Por favor, verifica tu cuenta antes de iniciar sesión.'){
          toast.info(<div className='flex flex-col gap-2'>
            <h1>{error.response.data.message}</h1>
            <button disabled={loading} onClick={()=>handleResentEmail(values.email)} className='bg-blue-800 p-1 text-white w-20px rounded-md font-bold'>{loading ? <Spinner color='white' size='sm'/> : "Enviar correo"}</button>
          </div>)
        }else{
          !error.response.data.error ? toast.error(error.response.data.message) : toast.error(error.response.data.error)
          // toast.error(error.response.data.error);
        }
    } finally {
        setSubmitting(false);
    }
};

console.log(accessToken);

  return (
    <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchemaLogin} onSubmit={handleSubmit}>
      <Form noValidate className='flex flex-col gap-3 justify-center items-center h-full transition-all duration-1000 '>
        <div className='flex flex-col h-14 w-full sm:w-[90%] '>
          <div className='flex w-full '>
            <span className='inline-flex items-center px-2 text-lg text-gray-900 bg-primary border rounded-e-0 border-gray-300 border-e-0 rounded-s-md '>
              <IoIosMail className='text-my-gray ' />
            </span>
            <Field className='focus:outline-[#b34eda] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5' type='email' title='Email' name='email' placeholder='Email' maxLength='255' />
          </div>
          <ErrorMessage name='email' className='text-red-600 font-semibold ' component='span' />
        </div>

        <div className='flex flex-col h-14 w-full sm:w-[90%] '>
          <div className='flex md:w-full '>
            <span className='inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-primary border rounded-e-0 border-e-0 rounded-s-md border-gray-300' onClick={toggleShowPassword}>
              {showPassword ? <FaLockOpen className='text-my-gray' title='Press to hide password' /> : <FaLock className='text-my-gray' title='Press to show password' />}
            </span>
            <Field className='focus:outline-[#b34eda] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 text-sm border-gray-300 p-2.5 ' type={showPassword ? 'text' : 'password'} title='Password' name='password' placeholder='Password' maxLength='64' />
          </div>
          <ErrorMessage name='password' className='text-red-600 font-semibold' component='span' />
        </div>
        <div className='flex flex-col items-center w-full my-2'>
          <Link className='text-primary' to='/auth/forgotPassword'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <button type='submit' className='w-[calc(100%-5px)] sm:w-[250px] text-white text-md bg-primary hover:bg-primary border border-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105'>
          Iniciar Sesión
        </button> 
        <AuthSwitcher text='Registrarse' to='/auth/register' />
      </Form>
    </Formik>
  );
};

export default LoginForm;
