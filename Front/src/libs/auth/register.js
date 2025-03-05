import * as Yup from 'yup';
import { errorToast, successToast } from '../sonnerToast';
import { URL_API } from '../axios';
import axios from 'axios';


export const validationSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Debe tener al menos 5 caracteres').required('Nombre Requerido'),
    last_name: Yup.string().min(5, 'Debe tener al menos 5 caracteres').required('Apellido Requerido'),
    phone_number: Yup.number().required('Telefono Requerido'),
    email: Yup.string().min(6, 'Debe tener al menos 6 caracteres').email('Correo Invalido').required('Correo Electrónico es Requerido'),
    password: Yup.string().min(8, 'Debe tener al menos 8 caracteres').required('Contraseña Requerida')
            .matches(/[A-Z]/, 'La Contraseña dene tener una mayúscula')
            .matches(/[a-z]/, 'La Contraseña debe tener una minúscula')
            .matches(/[0-9]/, 'La Contraseña dene tener un número')
            .matches(/[\W_]/, 'La Contraseña dene tener un caracter especial'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ], 'Las contraseñas no coinciden')
        .required('Confirmar la Contraseña Requerida')
});


//? array de valores iniciales del formulario de registro
export const initialValuesClients = {
    name: '',
    phone_number: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

//? array de valores iniciales del formulario de registro
export const initialValuesAdmin = {
    name: '',
    documentType: 1,
    document: '',
    country:'',
    department: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 1
}



// ?Servicio para crear Usuairos Admistradores 
export const CreateUserAdminService = async(newAdmin, city) => {
  newAdmin.documentType=parseInt(newAdmin.documentType)
    try {
      const response = await axios.post(`${URL_API}/auth/register`, {
        name:newAdmin.name,
        documentTypeId:newAdmin.documentType,
        document:newAdmin.document,
        country:newAdmin.country,
        strCountry:newAdmin.strCountry,
        departament:newAdmin.department,
        strDepartment:newAdmin.strDepartment,
        city:city,
        strCity:newAdmin.strCity,
        address: newAdmin.address,
        phone:newAdmin.phone,
        email:newAdmin.email,
        status:true,
        roleId:newAdmin.rol,
        password:newAdmin.password
      });
      return successToast(response.data.message);
    } catch (error) {
      errorToast(error.response.data.error);
      console.error(`Error creating data from ${URL_API}:`, error);
      throw error;
    }
  }