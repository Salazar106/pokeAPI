import AuthSwitcher from "../../ui/authSchert";
import { CardContainer } from "../../ui/auth/cardContainer";
import { CreateUserForm } from "../../ui/admin/profile/createUser";

/**
 * @Author : Daniel Salazar,   @date 2024-10-07 17:05:37
 * @description :Pagina de autenticacion de Registro de usuarios
 * @Props :null
 */

export const RegisterPage = () => {
    
    return (

        <CardContainer
            title={"Registro"}
            description={"Ingresa tu información para registrarte"}
            width={true}
            isRegisterForm={true}
        >
            <CreateUserForm isCreateUser={true} isAdmin={false}/>
            <AuthSwitcher text="Iniciar Sesión" to="/auth/login" />
        </CardContainer>
       
    );
};

