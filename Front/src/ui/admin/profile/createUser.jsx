import { Formik, Field, Form, ErrorMessage } from "formik";
import { initialValuesClients, validationSchema , initialValuesAdmin } from "../../../libs/auth/register";
import { useContext, useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { getData, } from "../../../libs/axios";
import { useNavigate } from "react-router-dom";
import { useRefreshTable } from "../../../hooks/refreshTable";
import { MyContext } from "../../../context/context";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";

export const CreateUserForm = ({isAdmin, isCreateUser}) => {
  const {$Auth}=useContext(MyContext)
  const { refresh, setRefresh } = useRefreshTable();
  const [showPassword, setShowPassword] = useState(false); //? estate to change the password to show/hide
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  //? function to toggle the show/hide of the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  const handleSubmit = async (values, {  setSubmitting }) => {
    // return console.log(values);
    setIsLoading(true)
    try {
        
      // CreateUserAdminService(values, city)
      const res = await $Auth.registerUser(values)
      toast.success(res.data.message)
      
      if(isCreateUser && res.data.user){
        navigate('/auth/login')
      }
    } catch (error) {
      console.log("Error ", error.response.data);
      toast.error(error.response.data.message)
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

 
  return (
    <Formik
      initialValues={isAdmin?initialValuesAdmin:initialValuesClients}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(
        { setFieldValue } // Extract setFieldValue from Formik props
      ) => (
        <Form className="flex flex-col flex-nowrap justify-center border-white w-full">
          <div className="flex flex-nowrap ">
            <div className="flex flex-col gap-2 justify-center items-center w-full transition-all duration-50">
              <div className="overflow-y-auto md:overflow-hidden w-full">
                <div className="flex w-full gap-3 mb-2 flex-wrap md:flex-nowrap">
                  <div className="flex flex-col h-14 w-full">
                    <div className="flex w-full  ">
                      <Field
                        className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                        type="text"
                        title="Nombres"
                        name="name"
                        placeholder="Nombres"
                        maxLength="50"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      className="text-red-600 font-semibold text-sm"
                      component="span"
                    />
                  </div>
                  <div className="flex flex-col h-14 w-full">
                    <div className="flex w-full  ">
                      <Field
                        className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                        type="text"
                        title="Apellidos"
                        name="last_name"
                        placeholder="Apellidos"
                        maxLength="50"
                      />
                    </div>
                    <ErrorMessage
                      name="last_name"
                      className="text-red-600 font-semibold text-sm"
                      component="span"
                    />
                  </div>
                </div>



                <div className="flex w-full gap-3 mb-2 flex-wrap md:flex-nowrap">
                  <div className="flex flex-col h-14 w-full">
                    <div className="flex w-full  ">
                      <Field
                        className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                        type="text"
                        title="Teléfono"
                        name="phone_number"
                        placeholder="Teléfono"
                        maxLength="15"
                      />
                    </div>
                    <ErrorMessage
                      name="phone_number"
                      className="text-red-600 font-semibold text-sm"
                      component="span"
                    />
                  </div>

                  <div className="flex flex-col h-14 w-full">
                    <div className="flex w-full  ">
                      <Field
                        className="focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                        type="email"
                        title="Email"
                        name="email"
                        placeholder="Email"
                        maxLength="50"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      className="text-red-600 font-semibold text-sm"
                      component="span"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="flex w-full gap-3 mb-2 flex-wrap md:flex-nowrap">
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
                        maxLength="30"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      className="text-red-600 font-semibold text-sm"
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
                      className="text-red-600 font-semibold text-sm"
                      component="span"
                    />
                  </div>
                </div>
              </div>
              <div className=" focus:outline-[#b34eda] flex flex-wrap gap-2 justify-center w-full mt-3">
                  
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[250px] text-white text-md bg-primary font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105"
                >
                  {isLoading ? <Spinner color='white' size="sm"/> : isCreateUser ? "Crear Usuario" : "Registrarse"}
                  
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

