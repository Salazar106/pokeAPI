import { validationSchema } from "../../libs/auth/recoverPassword";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoIosMail } from "react-icons/io";
import AuthSwitcher from "../../ui/authSchert";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { MyContext } from "../../context/context";
import { Spinner } from "@nextui-org/react";

export const ForgotPasswordForm = () => {
  const { $Auth } = useContext(MyContext); // Accede al contexto
  const [isLoading, setIsLoading] =useState(false)
    

    const handleSubmit = async (values, { setSubmitting }) => {
      setIsLoading(true); // Muestra spinner
      try {
        const response = await $Auth.forgotPassword(values.email);
        toast.success("Correo de recuperación enviado exitosamente. Por favor, revisa tu correo electrónico.");
      } catch (error) {
          console.error("Error al enviar el correo:", error);          
          toast.error(error.response.data.message);
      } finally {
          setSubmitting(false);
          setIsLoading(false); // Oculta spinner
      }
    };

    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
          <Form className=" ">
              <div className="flex flex-col gap-2 justify-center items-center w-full h-full tansition-all duration-500">
                <div className="flex flex-col h-14 w-full sm:w-[90%]  ">
                  {/*  //?box input User */}
                  <div className="flex w-full  ">
                    <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-primary border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                      <IoIosMail className="text-my-gray " />
                    </span>
                    <Field
                      className={`focus:outline-[#b34eda] rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`}
                      type="email"
                      title="Email"
                      name="email"
                      placeholder="Email"
                      maxLength="255"
                    />
                  </div>
                  <ErrorMessage name="email" className="text-red-600 font-semibold " component="span" />
                </div>
                <button disabled={isLoading} type="submit" className="w-[calc(100%-5px)]  sm:w-1/2  text-white text-md bg-primary hover:bg-primary border border-gray-300 focus:outline-none  font-medium rounded-lg  px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105 ">
                  {isLoading ? <Spinner color="white" size="sm"/>:"Enviar Email de Recuperación"}
                </button>
              </div>
            <AuthSwitcher text="Iniciar Sesión" to="/auth/login" />
          </Form>
      </Formik>
    )
}