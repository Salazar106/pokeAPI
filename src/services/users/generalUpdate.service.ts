import { db } from "../../config";

export const UpdateUserService = async(data:any) => {
    try {
        
        const userExist = await db.users.findUnique({ where : { id_user:data.id_user } });
        if(!userExist) throw new Error('User not found');

        if(data.email){
            // Se valida que el correo no exista, sin embargo se excluye el correo de quien lo está editando
            const emailExist = await db.users.findFirst({ where : { email:data.email, NOT: { id_user: data.id_user } } });
            if(emailExist) throw new Error('Email already exist');
        }

       

        const newStatus = await db.users.update({
            where : { id_user:data.id_user },
            data : { ...data}
        })
        return newStatus;
        
    } catch (error: any) {
        throw new Error(error.message || 'Internal server error');
        
    }
}