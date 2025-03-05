import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo Invalido').min(6, 'Debe tener al menos 6 caracteres').required('Correo Electrónico es Requerido'),
});