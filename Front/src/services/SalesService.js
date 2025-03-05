import axios from "axios";
const PayPalApiKey= import.meta.env.VITE_PAYPAL_API_KEY;
const MercadoPagoApiKey= import.meta.env.VITE_MERCADO_PAGO_API_KEY;

export default class SalesService {
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

  async getUserPurchasesService(data, page, limit, search) {
    return axios.post(`${this.API_URL}/sales/getUserPurchases`, { id: data, page: page, pageSize: limit, searchTerm: search });
  }

  async getYearsPurchasesService() {
    return axios.get(`${this.API_URL}/sales/getYears`);
  }

  async getAllPurchasesService(year, page, limit, search) {
    return axios.post(`${this.API_URL}/sales/getAllPurchases`, { year: year, page: page, pageSize: limit, searchTerm: search });
  }

  async UpdateSaleToPay(data) {
    return axios.post(`${this.API_URL}/sales/updatePurchaseToPay`, data);
  }

  async updateSalesStatus(data) {
    return axios.post(`${this.API_URL}/sales/updateStatusPurchase`, data);
  }

  async createUserTemplate(data) {
    return axios.post(`${this.API_URL}/sales/newTemplate`, data);
  }

  async updateUserTemplate(data) {
    return axios.post(`${this.API_URL}/sales/updateTemplate`, data);
  }

  async getUserTemplates(id_users, page) {
    return axios.get(`${this.API_URL}/sales/getUserTemplates`, {
      params: { id_users, page },
    });
  }

  async generateNewPurchase(id_user,status,salesTemplates) {
   return axios.post(`${this.API_URL}/sales/newPurchase`, {
      id_user, 
      status, 
      salesTemplates,
   })
  }

  async createTemplateFromDecorator(fileData){
    return axios.post(`${this.API_URL}/upload/template/design`,fileData)
  }

  async UpdateTemplateFromDecorator(fileData, idTemplate){
    return axios.put(`${this.API_URL}/upload/template/design/update/${idTemplate} `,fileData)
  }

  async deleteImgDecorator (idTemplate){
    return axios.delete(`${this.API_URL}/upload/template/delete/image/${idTemplate}`)
  }

  async generateMercadoPagoToken (){
    return axios.post('https://mercadopago.disruptiveinfotech.com/api/token',{
      apiKey: MercadoPagoApiKey
    })
  }
  async generatePayPalToken (){
    return axios.post('https://paypal.disruptiveinfotech.com/api/token',{
      apiKey: PayPalApiKey
    })
  }

  async generateMercadoPagoPayment (token, body){
    return axios.post('https://mercadopago.disruptiveinfotech.com/api/payment', 
      body, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
      }
    );
  }

  async generatePaypalPayment (token, body){
    return axios.post('https://paypal.disruptiveinfotech.com/api/paymentEndpoint', 
      body,
      {
        headers: { Authorization: `Bearer ${token}`}// Configuración de headers
      }
    );
  }
  

}
