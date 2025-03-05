import * as Yup from 'yup';
import { URL_API } from '../axios';
import { errorToast, successToast } from '../sonnerToast';
import axios from 'axios';

// ?Esquema de validaciones para el formulario de Usuarios
export const validationSchema = Yup.object().shape({
  name: Yup.string().min(5, 'Debe tener al menos 5 caracteres').required('Nombre Requerido'),
  documentType: Yup.string().required('Tipo de Identificación Requerido'),
  document: Yup.string().min(5, 'Documento debe tener al menos 5 dígitos').max(12, 'Documento no puede exceder los 12 dígitos').required('Identificación Requerida'),
  country: Yup.string().required('Pais Requerido'),
  strDepartment: Yup.string().required('Departamento Requerido'),
  strCity: Yup.string().required('Municipio Requerido'),
  address: Yup.string().required('Dirección Requerida'),
  phone: Yup.number().min(6, 'Teléfono debe tener al menos 6 dígitos').required('Telefono Requerido'),
  email: Yup.string().email('Correo Invalido').required('Correo Electrónico es Requerido')
});

//? array de valores iniciales del formulario de registro
export const initialValues = {
  name: '',
  documentType: 1,
  document: '',
  country:'',
  department: '',
  city: '',
  address: '',
  phone: '',
  email: '',
}

//? Columnas que llevara la tabla de usuarios
export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Nombre", uid: "name", sortable: true},
    {name: "País", uid: "country", sortable: true},
    {name: "Departamento", uid: "department", sortable: true},
    {name: "Municipio", uid: "city", sortable: true},
    {name: "Dirección", uid: "address"},
    {name: "Teléfono", uid: "phone", sortable: true},
    {name: "CorreoElectrónico", uid: "email"},
    {name: "Estado", uid: "strStatus", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];

//? tipos de estados que manejaran los usuarios
  export const statusOptions = [
    {name: "Activo", uid: "Activo"},
    {name: "Inactivo", uid: "Inactivo"},
  ];
// ?Colores de los estados del usuario
  export const statusColorMap = {
    Activo: "bg-green-500",
    Inactivo: "bg-my-red",
  };
  
//? Columnas visibles en la tabla de usuarios
  export const initialVisibleColumns = ["name", "phone", "email", "address", "strStatus", "actions"];
  

// ?Service to Update Users
  export  const UpdateUser = async(user) => {
    user.city = parseInt(user.city)
    user.documentType = parseInt(user.documentType)
    try {
      const response = await axios.post(`${URL_API}/profile/updateUser`, user);
      return successToast(response.data.message)
    } catch (error) {
      errorToast(`Error, No se puede actualizar a ${user.name}` )
      console.error(error);
      throw error;
    }
  }






  
  
