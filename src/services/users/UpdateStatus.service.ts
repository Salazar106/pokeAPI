import { db } from "../../config";

export const UpdateStatusService = async(data:any) => {
    try {
        const { state_id, id_user } = data;

        const userExist = await db.users.findUnique({ where : { id_user } });
        if(!userExist) throw new Error('User not found');

        const newStatus = await db.users.update({
            where : { id_user },
            data : { state_id }
        })
        return newStatus;
        
    } catch (error: any) {
        throw new Error(error.message || 'Internal server error');
        
    }
}