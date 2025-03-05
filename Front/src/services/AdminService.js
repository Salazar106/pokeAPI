import axios from "axios";

export default class AdminService {
    constructor(token = null) { 
        this.API_URL = import.meta.env.VITE_API_URL;
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }
    
    getAuthHeaders() {
        // Retorna los encabezados de autorización si el token está disponible
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    async getMyPokemon( page, limit, searchTerm ) {
        return axios.get(`${this.API_URL}/admin/allUsers`, {
            params: { page, limit, searchTerm }, // parámetros
            headers: this.getAuthHeaders() // Invocar el token 
        });
    }

    async getAllClients( page, limit, searchTerm ) {
        return axios.get(`${this.API_URL}/admin/allClients`, {
            params: { page, limit, searchTerm }, // parámetros
            headers: this.getAuthHeaders() // Invocar el token 
        });
    }

    async deleteUser(idUser) {
        return axios.delete(`${this.API_URL}/admin/deleteUser`, {
            params: { id: idUser },
            headers: this.getAuthHeaders() // Invoca la función aquí
        });
    }

    async updateUserStatus(data) {
        return axios.post(`${this.API_URL}/profile/updateUserStatus`,data,{ headers: this.getAuthHeaders() } );
    }

    async salesStatusChart(data) {
        return axios.get(`${this.API_URL}/charts/salesStatusInform`, {
            params: data, // Enviar los datos como query params
            headers: this.getAuthHeaders(), // Encabezados de autenticación
        });
    }

    async salesDataChart() {
        return axios.get(`${this.API_URL}/charts/salesInform`, {
            headers: this.getAuthHeaders(), // Encabezados de autenticación
        });
    }
}
