import { Navigate, useSearchParams } from "react-router-dom";
import { CardContainer } from "../../ui/auth/cardContainer";
import { ChangePasswordForm } from "../../ui/auth/changePasswordForm";

export const RecoverPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
  
    // *if missing token, navigate to login page
    if (!token) {
      return <Navigate to="/auth/login" replace />;
    }
    
    
    return (
        <CardContainer
            title={"Recuperar Contraseña"}
            description={""}
        >
            <ChangePasswordForm token={token}/>
        </CardContainer>
        
    )
}

