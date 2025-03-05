/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MyContext } from "../../../context/context";
import { toast } from "sonner";
import { useRefreshTable } from "../../../hooks/refreshTable";
import { avatar } from "@nextui-org/react";

// Esquema de validación
const validationSchema = Yup.object({
  image: Yup.mixed()
    .required("Se requiere una imagen")
    .test(
      "fileType",
      "Solo se permiten imágenes con extensiones .png, .jpg o .jpeg",
      (value) =>
        value &&
        ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
    ),
});

export const EditImgForm = ({idUser}) => {  

  const { $Auth, setActualUser, actualUser } = useContext(MyContext)
  const { refresh, setRefresh } = useRefreshTable();

  
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (values) => {
    // console.log(values);
    // return
    try {
      const id = values.id; 
      const formData = new FormData();
      formData.append("file", values.image);
      const response = await $Auth.updateProfilePicture(id, formData); // Llama a tu método de Axios.
      toast.success("Imagen actualizada correctamente");
      !refresh ? setRefresh(true) : setRefresh(false);
      setActualUser((prevUser) => ({ ...prevUser, avatar: response.data.fileUrl }))
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("No se pudo actualizar la imagen.");
    }
  };

  return (
    <Formik
      initialValues={{ image: null, id: idUser }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="flex flex-col justify-center items-center gap-1">
         
            <p className="text-default-500">Solo se aceptan formatos jpg, jpeg y png </p>

            <div className="flex items-center gap-4">
              <label className="font-semibold">Subir Imagen:</label>
              <input
                id="image"
                name="image"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
              {errors.image && touched.image && (
                <div style={{ color: "red" }}>{errors.image}</div>
              )}

            </div>

          {/* Vista previa de la imagen */}
          {preview && (
            <div className="flex flex-col gap-2 items-center ">
              <p className="font-bold ">Vista previa:</p>
              <img
                src={preview}
                alt="Vista previa"
                className=" border-3 border-white rounded-full w-52 h-52 shadow-xl shadow-default-600"
                // style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}

        <button type='submit' className='w-[calc(100%-5px)] sm:w-[250px] text-white text-md bg-primary hover:bg-primary mt-2 focus:outline-none font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105'>
          Actualizar Foto
        </button>
        </Form>
      )}
    </Formik>
  );
};

