import axios from "axios";

export default class AuthService {
    constructor(token = null) { 
        this.API_URL = import.meta.env.VITE_API_URL;
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }
    
    async login(email, password) {
        return axios.post(`${this.API_URL}/auth/login`, {
            email: email,
            password
        });
    }

    async registerUser(user){
        return axios.post(`${this.API_URL}/auth/register`, {
            name:user.name,
            last_name:user.last_name,
            phone_number:user.phone_number,
            email:user.email,
            password:user.password
          });
    }

    async getUserProfile(idUser) {
        return axios.post(`${this.API_URL}/profile/getUserProfile`, {id:idUser});
    }

    async updateUserProfile(idUser, user){
        user.documentType=parseInt(user.documentType)
        user.rol=parseInt(user.rol)
        user.city=parseInt(user.city)
        user.departament=parseInt(user.departament)
        user.country=parseInt(user.country)
        return axios.post(`${this.API_URL}/profile/updateUserProfile`, {
          });
    }

    async googleLogin(){
        return axios.get(`${this.API_URL}/auth/google`);
    }

    async forgotPassword(email){
        return axios.post(`${this.API_URL}/auth/forgotPassword`, { email:email });
    }

    async restorePasswordWithToken(token, password, confirmPassword){
        return axios.post(`${this.API_URL}/auth/reset-password/${token}`, {
            newPassword:password,
            confirmPassword:confirmPassword
        });
    }

    async updatePasswordWithOutToken(data){
        return axios.post(`${this.API_URL}/profile/updatepassword`, data )
    }

    async updateProfilePicture(id,fileData){ 
        return axios.post(`${this.API_URL}/upload/avatar/${id}`,
            fileData
        )
    }

    async resentEmailVerificationAcount(email){
        return axios.get(`${this.API_URL}/auth/resend-email`, {
            params: { email: email },
          })
    }

    async verifyUserGoogleLogin(token) {
        return axios.post(`${this.API_URL}/auth/login-with-google`, {token: token})
    }
}