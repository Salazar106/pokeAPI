import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { useRefreshTable } from "../../hooks/refreshTable";
import { useContext } from "react";
import { MyContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../libs/auth/restorePassword'

export const ChangePasswordForm = ({idUser, token}) => {
    const { $Auth } = useContext(MyContext); // ?Access to auth Services
    const navigate = useNavigate() //? Access to navigate to routes
    const {refresh, setRefresh} = useRefreshTable() // ?Access to refrash tables Status
    const [showPassword, setShowPassword] = useState(false); //? estate to changge the password to show/hide
    const toggleShowPassword = () => { setShowPassword(!showPassword)}

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const jsonData= {id: values.id, password: values.password}
      const response = await $Auth.updatePasswordWithOutToken(jsonData);
      toast.success(response.data.message)
      !refresh?setRefresh(true):setRefresh(false);
    } catch (error) {
      toast.error(error.response.data.message)
        // console.log("Error ", error);
    } finally {
        setSubmitting(false);
    //   setRefresh();
    }
  };

  const handleSubmitWithToken = async(values,{setSubmitting}) =>{
    // return console.log({token:token,password:values.password, confirm:values.confirmPassword})
    try {
      const response = await $Auth.restorePasswordWithToken(token, values.password, values.confirmPassword); 
      toast.success(response.data.message);
      navigate("/auth/login")
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error ", error);
    } finally {
        setSubmitting(false);
    //   setRefresh();
    }

  }

  const initialValues = {
    id:idUser,
    password: "",
    confirmPassword: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={token? handleSubmitWithToken: handleSubmit}
    >
      <Form className=" p-5 transition-all duration-1000 ">
        <div className="flex flex-nowrap">
          <div className="flex flex-col gap-2 justify-center items-center w-full tansition-all duration-500">
            <span className="w-full text-center text-gray-600 cursor-default">
              Ingresa tu nueva contraseña, recuerda que debe cumplir los
              estándares de seguridad:
            </span>
            <span className="w-full text-center text-gray-400 cursor-default">
              8 caracteres, una minúscula, una mayúscula, un número y un
              carácter especial.
            </span>

            <div className="flex flex-col h-14 w-full">
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-primary border rounded-e-0 border-e-0 rounded-s-md border-gray-300"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FaLockOpen
                      className="text-my-gray"
                      title="Presiona para ocultar contraseña"
                    />
                  ) : (
                    <FaLock
                      className="text-my-gray"
                      title="Presiona para ver la contraseña"
                    />
                  )}
                </span>
                <Field
                  className="focus:outline-[#b34eda] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
                  type={showPassword ? "text" : "password"}
                  title="Contraseña"
                  name="password"
                  placeholder="Contraseña"
                  maxLength="64"
                />
              </div>
              <ErrorMessage
                name="password"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>

            <div className="flex flex-col h-14 w-full">
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-primary border rounded-e-0 border-e-0 rounded-s-md border-gray-300"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FaLockOpen
                      className="text-my-gray"
                      title="Presiona para ocultar contraseña"
                    />
                  ) : (
                    <FaLock
                      className="text-my-gray"
                      title="Presiona para ver la contraseña"
                    />
                  )}
                </span>
                <Field
                  className="focus:outline-[#b34eda] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
                  type={showPassword ? "text" : "password"}
                  title="Confirmar contraseña"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  maxLength="64"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>
            <button
              type="submit"
              className="w-[calc(100%-5px)]   sm:w-[250px]  text-white text-md bg-primary hover:bg-primary border border-gray-300 focus:outline-none  font-medium rounded-lg  px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105 "
            >
              Restablecer Contraseña
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
