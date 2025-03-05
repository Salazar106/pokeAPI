import * as Yup from 'yup';




/**
 * @Author : Daniel Peña,   @date 2024-09-20 20:16:56
 * @description :Esquema de validaciones para el formulario de login
 * @Params :null
 * @return :null
*/
export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Correo no valido, incluir "@" y "."').required('Correo Electrónico es Requerido'),
    password: Yup.string().required('Contraseña Requerida'),
});