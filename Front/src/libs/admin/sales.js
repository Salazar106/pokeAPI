import * as Yup from 'yup';
// import { URL_API } from '../axios';
// import { errorToast, successToast } from '../sonnerToast';
// import axios from 'axios';

// ?Esquema de validaciones para el formulario de Usuarios
export const TagPriceValidationSchema = Yup.object().shape({
    decorator_price: Yup.string().required('El precio de la etiqueta es requerido'),
  });


//? Columnas que llevara la tabla de usuarios
export const columns = [
    {name: "ID Compra", uid: "id", },
    {name: "Usuario", uid: "name", sortable: true},
    {name: "País", uid: "country", sortable: true},
    {name: "Dirección", uid: "address"},
    {name: "Teléfono", uid: "phone"},
    {name: "Correo Electrónico", uid: "email"},
    {name: "Precio Total", uid: "total_price"},
    {name: "Fecha de Pago", uid: "purchasedAt", sortable: true},
    {name: "Estado", uid: "strStatus", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];
  

//? tipos de estados que manejaran los usuarios
export const statusOptions = [
    {name: "Cotización", uid: "Cotización"}, 
    {name: "Para Pagar", uid: "Para Pagar"},
    {name: "Producción", uid: "Producción"},
    {name: "Enviado", uid: "Enviado"},
    {name: "Entregado", uid: "Entregado"},
    {name: "Cancelado", uid: "Cancelado"},
  ];

 export const statusColorMap = {
    Cotización:'bg-green-600',
    "Para Pagar":'bg-sky-600',
    Producción:'bg-my-pink',
    Enviado:'bg-green-400',
    Entregado:'bg-primary',
    Cancelado:'bg-my-red',
};

export const initialVisibleColumns = [
    "name",
    "phone", 
    "purchasedAt", 
    "finishDate", 
    "address",
    "total_price", 
    "strStatus", 
    "actions"
];


// Función que maneja la transformación de datos, incluyendo el formateo de moneda.
export const transformData = (dataArray, formatOptions) => {
  return dataArray.map(item => {
    // Si el formato requiere formateo de moneda, lo aplicamos
    if (formatOptions[item.name]) {
      return {
        ...item,
        value: formatCurrency(item.value) // Formateamos como moneda si es necesario
      };
    }
    return item; // Si no, devolvemos el item sin cambios
  });
};

// Función para formatear como moneda (puedes reutilizarla siempre que lo necesites)
const formatCurrency = (value) => {
  if (typeof value === 'number' && !isNaN(value)) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  }
  return value;
};


export const data = [
        {
          id: 1,
          avatar: "",
          name: "Juan Pérez",
          idTipe: "CC",
          strIDTipe: 1,
          document: "12345678",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 123",
          phone: "3006483858",
          email: "juan.perez@example.com",
          costo: 100.00,
          buyDate: "2024-10-01",
          finishDate: "2024-10-10",
          strStatus: "Cotización",
          status: 1
        },
        {
          id: 2,
          avatar: "",
          name: "Ana Gómez",
          idTipe: "CC",
          strIDTipe: 1,
          document: "87654321",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 124",
          phone: "3006483859",
          email: "ana.gomez@example.com",
          costo: 150.00,
          buyDate: "2024-09-21",
          finishDate: "2024-09-30",
          strStatus: "Para_Pagar",
          status: 2
        },
        {
          id: 3,
          avatar: "",
          name: "Luis Martínez",
          idTipe: "CC",
          strIDTipe: 1,
          document: "11223344",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 125",
          phone: "3006483860",
          email: "luis.martinez@example.com",
          costo: 200.00,
          buyDate: "2024-08-10",
          finishDate: "2024-08-20",
          strStatus: "Producción",
          status: 3
        },
        {
          id: 4,
          avatar: "",
          name: "María López",
          idTipe: "CC",
          strIDTipe: 1,
          document: "55667788",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 126",
          phone: "3006483861",
          email: "maria.lopez@example.com",
          costo: 250.00,
          buyDate: "2024-07-15",
          finishDate: "2024-07-25",
          strStatus: "Enviado",
          status: 4
        },
        {
          id: 5,
          avatar: "",
          name: "Carlos Ruiz",
          idTipe: "CC",
          strIDTipe: 1,
          document: "99887766",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 127",
          phone: "3006483862",
          email: "carlos.ruiz@example.com",
          costo: 300.00,
          buyDate: "2024-06-01",
          finishDate: "2024-06-10",
          strStatus: "Entregado",
          status: 5
        },
        {
          id: 6,
          avatar: "",
          name: "Lucía Fernández",
          idTipe: "CC",
          strIDTipe: 1,
          document: "33445566",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 128",
          phone: "3006483863",
          email: "lucia.fernandez@example.com",
          costo: 350.00,
          buyDate: "2024-05-05",
          finishDate: "2024-05-15",
          strStatus: "Cancelado",
          status: 6
        },
        {
          id: 7,
          avatar: "",
          name: "Roberto García",
          idTipe: "CC",
          strIDTipe: 1,
          document: "77889900",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 129",
          phone: "3006483864",
          email: "roberto.garcia@example.com",
          costo: 400.00,
          buyDate: "2024-04-01",
          finishDate: "2024-04-10",
          strStatus: "Cotización",
          status: 1
        },
        {
          id: 8,
          avatar: "",
          name: "Sara Hernández",
          idTipe: "CC",
          strIDTipe: 1,
          document: "22334455",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 130",
          phone: "3006483865",
          email: "sara.hernandez@example.com",
          costo: 450.00,
          buyDate: "2024-03-10",
          finishDate: "2024-03-20",
          strStatus: "Para_Pagar",
          status: 2
        },
        {
          id: 9,
          avatar: "",
          name: "Tomás Pérez",
          idTipe: "CC",
          strIDTipe: 1,
          document: "66778899",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 131",
          phone: "3006483866",
          email: "tomas.perez@example.com",
          costo: 500.00,
          buyDate: "2024-02-15",
          finishDate: "2024-02-25",
          strStatus: "Producción",
          status: 3
        },
        {
          id: 10,
          avatar: "",
          name: "Laura Sánchez",
          idTipe: "CC",
          strIDTipe: 1,
          document: "44556677",
          country: "COLOMBIA",
          id_country: 1,
          id_department: 20,
          department: "CESAR",
          city: "Pelaya",
          id_city: 654,
          address: "Calle Falsa 132",
          phone: "3006483867",
          email: "laura.sanchez@example.com",
          costo: 550.00,
          buyDate: "2024-01-20",
          finishDate: "2024-01-30",
          strStatus: "Enviado",
          status: 4
        }
]