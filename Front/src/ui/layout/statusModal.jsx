import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";

import { useRefreshTable } from "../../hooks/refreshTable";
import { MyContext } from "../../context/context";
import { toast } from "sonner";

/**
 * @Author : Daniel Salazar,   @date 2024-10-21 13:59:19
 * @description :Modal to show the status of user and describe the current status
 * @Props : ~btnColor: recibe color of button to showed in dataTable
 *          ~data: all data of user selected in dataTable
 *          ~btnName: name of button to show in dataTable
 *          ~title: variable to Know about what jsonState compile
 */

export default function StatusModal({
  btnColor,
  data,
  btnName,
  title,
  isUser,
}) {
  const { actualUser, $Admin } = useContext(MyContext); // Accede al contexto

  const { refresh, refreshClients, setRefreshClients, setRefresh } = useRefreshTable(); // ?useContext to refresh the table
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userStatus = data.status === true ? "true" : "false"; // ?parse bool to string
  const purchaseStatus = String(data.status);
  const isAdmin = actualUser.role === "Admin" ? true : false;

  const usersStatus = [
    {
      name: "Activo",
      value: "true",
      color: "text-green-500 font-bold underline",
      description: "El usuario podrá acceder con total normalidad al sistema.",
    },
    {
      name: "Inactivo",
      value: "false",
      color: "text-my-red font-bold underline",
      description:
        "El usuario no podrá acceder al sistema hasta que se active manualmente.",
    },
  ];

  const salesState = [
    {
      name: "Cotización",
      value: "1",
      color: "text-green-600 underline font-semibold",
      description: !isAdmin
        ? "El costo de la etiqueta está siendo evaluado cuidadosamente por uno de nuestros asesores en Nupak. Una vez se complete la cotización, recibirás una notificación por correo electrónico para proceder con el pago correspondiente. ¡Gracias por tu paciencia!"
        : "Tienes que realizar la cotización de la etiqueta para que el cliente pueda proceder con el pago.",
    },
    {
      name: "Para_Pagar",
      value: "2",
      color: "text-sky-600 underline font-semibold",
      description: !isAdmin
        ? "¡Tu diseño está listo para el siguiente paso! Al completar el pago, tu pedido avanzará directamente a producción. Gracias por tu preferencia."
        : "Se está esperando a que el cliente realice el pago para poder empezar con la producción del producto.",
    },
    {
      name: "Producción",
      value: "3",
      color: "text-my-pink underline font-semibold",
      description: !isAdmin
        ? "Tu diseño está siendo elaborado con los más altos estándares de calidad. Nos aseguramos de cuidar cada detalle para que el resultado supere tus expectativas. Muy pronto, el producto estará listo y en camino hacia tu dirección. ¡Gracias por tu confianza y paciencia!"
        : "El producto está en producción, tan pronto como se finalice su elaboración,  cambiar el estado del producto y enviarlo.",
    },
    {
      name: "Enviado",
      value: "4",
      color: "text-green-400 underline font-semibold",
      description: !isAdmin
        ? "¡Tu pedido ya está en camino! Ha salido de nuestras instalaciones y se dirige a la dirección proporcionada. Pronto podrás disfrutar de tu compra."
        : "El producto fue enviado satisfactoriamente. ",
    },
    {
      name: "Entregado",
      value: "5",
      color: "text-primary underline font-semibold",
      description: !isAdmin
        ? "¡Tu pedido ha sido entregado exitosamente! Esperamos que estés satisfecho con tu compra. No dudes en contactarnos si necesitas ayuda adicional."
        : "El producto fue entregado satisfactoriamente. ",
    },
    {
      name: "Cancelado",
      value: "6",
      color: "text-my-red underline font-semibold",
      description: !isAdmin
        ? "El pedido ha sido cancelado. Si tienes alguna consulta o deseas más información sobre el estado, nuestro equipo está disponible para asistirte."
        : "La compra fue cancelada",
    },
  ];

  const [dataStates] = useState(isUser ? usersStatus : salesState);

  const initialValues = {
    option: isUser ? userStatus : purchaseStatus,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const hasChanged = Object.keys(initialValues).some(
        (key) => initialValues[key] !== values[key]
      );
      if (!hasChanged) {
        toast.error("No hay cambios en el estado del usuario, verifica por favor.");
        setSubmitting(false);
        return;
      }
      const jsonData = {id: data.id, status: values.option === "true" ? true : false};
      const response = await $Admin.updateUserStatus(jsonData);
      toast.success(response.data.message);
      !refresh?setRefresh(true):setRefresh(false);
      !refreshClients? setRefreshClients(true):setRefreshClients(false);
    } catch (error) {
      console.log("Error ", error);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        className={`${btnColor} min-w-20 py-1 text-white rounded-3xl font-semibold`}
        onClick={onOpen}
      >
        {btnName}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Estados</ModalHeader>
              <ModalBody>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ values }) => (
                    <Form>
                      {isUser ? (
                        <h1 className="text-center text-default-600">
                          Selecciona el nuevo estado de ${data.name}
                        </h1>
                      ) : (
                        <h1 className="text-center text-default-600">
                          Tu estado actual es{" "}
                          <strong className="underline">
                            {data.strStatus}
                          </strong>
                          , verifica en que momento tu compra puede cambiar de
                          estado
                        </h1>
                      )}

                      <div className="flex w-full justify-center gap-10 flex-wrap mt-2">
                        {dataStates.map((status, i) => (
                          <div key={i}>
                            <Field
                              type="radio"
                              name="option"
                              value={status.value}
                              className="mr-2"
                            />
                            <span className={`ml-1 ${status.color}`}>
                              {status.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Mostrar la descripción solo si hay una opción seleccionada */}
                      {values.option && (
                        <h1 className="text-default-500 text-center my-5">
                          {
                            dataStates.find(
                              (status) => status.value === values.option
                            )?.description
                          }
                        </h1>
                      )}
                      <div className="flex w-full justify-center">
                        {isUser && (
                          <button
                            type="submit"
                            onClick={onClose}
                            className="w-[250px] text-white text-md bg-primary font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105"
                          >
                            Actualizar
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
