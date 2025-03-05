import { Request } from 'express';


export interface IUserRegister {
    name: string
    last_name: string
    email: string
    gender:string
    phone_number: string
    state_id: boolean
    password: string
  }

export interface CustomRequest extends Request {
    user?: any ;
  }