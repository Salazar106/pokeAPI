import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { MyContext } from "../context/context";

/**
 * @Author : Daniel Salazar,   @date 2024-10-07 09:06:33
 * @description : Página que aparece cuando se ingresa una URL inexistente; permite redireccionar al inicio o según el rol.
 * @Props : null
 */

export const PageNotFound = () => {
    const { accessToken, actualUser } = useContext(MyContext);
    const navigate = useNavigate();

    // ?Función para redireccionar al usuario según autenticación y rol
    const redirection = () => {
        if (accessToken && actualUser) {
            // ?Redirige según el rol del usuario
            if (actualUser.role === "Admin") {
                navigate("/admin");
            } else if (actualUser.role === "Client") {
                navigate("/client");
            }
        } else {
            // ?Si no está autenticado, redirige al inicio
            navigate("/");
        }
    };

    return (
        <div className="w-screen h-screen bg-[#b34eda] flex flex-col justify-center items-center text-center">
            <h1 className="text-9xl font-bold text-white ">404</h1>
            <h1 className="text-5xl mb-2 text-gray-200">Página no encontrada</h1>
            <p className="text-gray-300">La página que estás buscando no existe, por favor revisa que la dirección URL esté bien escrita y vuelve a intentarlo</p>
            <Button className="mt-4 bg-white" onClick={redirection}>Ir al inicio</Button>
        </div>
    );
};
