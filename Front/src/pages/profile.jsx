import { InformationData } from "../ui/admin/profile/informationData";
// import { useUser } from "../hooks/userContext";
import { useContext } from "react";
import { MyContext } from "../context/context";

/**
 * @Author : Daniel Peña,   @date 2024-10-5 20:16:56
 * @description : Pagina de perfil de usuario independientemente si es Admin o cliente
 * @Params :null
*/

export const ProfilePage = () => {
  const { actualUser } = useContext(MyContext);
  const user = actualUser; //? provider de usuario logeado
  // const user = useUser(); //?Se trae provider de usuario para identificar si muestro tabla de historial

  return (
    <div className="max-w-full max-h-[calc(100%-20px)] flex flex-col ">
      <div className="flex-grow p-3">
        <p className="text-2xl font-bold text-gray-600">Mi perfil</p>
        <p className="text-gray-600"></p>
      </div>
      <div className="flex flex-col p-5 items-center gap-6">
        <InformationData />
        
      </div>
    </div>
  );
};
