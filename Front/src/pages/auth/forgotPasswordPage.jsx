import { CardContainer } from "../../ui/auth/cardContainer";
import { ForgotPasswordForm } from "../../ui/auth/ForgorPasswordForm";

/**
 * @Author : Daniel Salazar,   @date 2024-10-07 17:02:34
 * @description :Pagina de autenticacion "recuperar contraseña" donsde se envia email de recuperacion a los usuarios.
 * @Props :null
 */

export const ForgotPasswordPage = () => {

    return (
      <CardContainer
        title={"Recuperar Contraseña"}
        description={"Ingresa tu correo electrónico para enviarte un email de recuperación de contraseña"}
      >
        <ForgotPasswordForm/>
      </CardContainer>
      
    )
}