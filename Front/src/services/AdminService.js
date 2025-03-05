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

    async getMyPokemon(page, pageSize) {
        console.log(this.getAuthHeaders());
        return axios.post(
            `${this.API_URL}/poke/myPokemons`,
            {}, // Cuerpo de la solicitud (vacío en este caso)
            {
                params: { page, pageSize }, // Parámetros de consulta
                headers: this.getAuthHeaders() // Encabezados
            }
        );
    }

    async findProkemon( identifier ) {
        return axios.post(`${this.API_URL}/poke/getFromApi`, 
            {identifier}, // Cuerpo de la solicitud (vacío en este caso)
            {
                headers: this.getAuthHeaders() // Encabezados
            });
    }

    async CreatePokemon(data) {
        return axios.post(`${this.API_URL}/poke/create`, 
            {data}, // Cuerpo de la solicitud (vacío en este caso)
            {
                headers: this.getAuthHeaders() // Encabezados
            });
    }
   
}
