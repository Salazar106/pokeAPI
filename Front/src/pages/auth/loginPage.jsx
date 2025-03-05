import { CardContainer } from "../../ui/auth/cardContainer";
import LoginForm from "../../ui/auth/loginForm";

/**
 * @Author : Daniel Salazar,   @date 2024-09-20 20:10:58
 * @description :Formulario de login con validaciones y controles de errores, realizado con Formik y Yup para validaciones de formularios.
 * @Props : null
 */
export const LoginPage = () => {
    return (
      <CardContainer 
        title={"Iniciar Sesión"} 
        description={"Ingresa tus credenciales para acceder"}
      >
        <LoginForm/>
      </CardContainer>
      
    )
}
