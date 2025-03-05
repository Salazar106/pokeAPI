import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {FaAngleDown, FaUserGear, FaPowerOff } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { MyContext } from "../../context/context";
import userLogo from "../../assets/imgs/NUpack/usuario.webp"

export default function AvatarDrawer() {
    const { actualUser } = useContext(MyContext);
    const user = actualUser; //? provider de usuario logeado
    const Navigate = useNavigate(); //? hook para poder redireccionar en la app
    const { logout } = useContext(MyContext);

    //? funcion que cierra sesion de usuarios
    const handleLogout = () => {
      logout();
      Navigate('/auth/login');
  }

    //?Validacion que identifica el tipo de usuario y lo redirecciona segun corresponda
    const goProfile = () => {
      user.role =="Admin" ? Navigate("/admin/profile") : Navigate("/client/profile")
    } 

  return (
    <div className="flex items-center gap-4">
          <img src={!user?.avatar?userLogo:user.avatar||""} className="w-20 h-20 p-2 rounded-full " alt="user-avatar" />
          <div className="hidden sm:flex sm:flex-col">
            <p className="text-white font-bold ">{user?.name||"hola "}</p>
            <p className="text-white">{user?.email||"hola@hola.com"}</p>
          </div>
      <Dropdown placement="bottom-start" classNames={{
        base: "before:bg-gray-900", 
        content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200",
      }}>
        <DropdownTrigger>
            <Button isIconOnly className="bg-transparent focus:outline-none hover:border-[#b34eda] hover:scale-150 transition-all duration-500"><FaAngleDown className="text-white"/></Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem color="primary" onClick={goProfile} startContent={<FaUserGear className="text-xl text-default-500"/>}>
                Mi Perfil {user?.role}
          </DropdownItem>       
          <DropdownItem  color="danger" onClick={handleLogout} startContent={<FaPowerOff className=""/>}>
                Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}