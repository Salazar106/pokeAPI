import * as Yup from "yup";

// ?Validation Schema from reset Password Form
export const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Contraseña Requerida")
      .min(8, "La Contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La Contraseña dene tener una mayúscula")
      .matches(/[a-z]/, "La Contraseña debe tener una minúscula")
      .matches(/[0-9]/, "La Contraseña dene tener un número")
      .matches(/[\W_]/, "La Contraseña dene tener un caracter especial"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Confirmar la Contraseña Requerida"),
  });
  
  