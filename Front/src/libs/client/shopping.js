

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
export const columnsClient = [
  {name: "ID Compra", uid: "id", },
  {name: "Precio Total", uid: "total_price"},
  {name: "Fecha de Pago", uid: "purchasedAt", sortable: true},
  {name: "Estado", uid: "strStatus", sortable: true},
  {name: "Motivo de Cancelacion", uid: "canceledReason"},
  {name: "ACTIONS", uid: "actions"},
];


export const initialVisibleColumns = [
    "id",
    "purchasedAt", 
    "total_price", 
    "strStatus",
    "actions"
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

