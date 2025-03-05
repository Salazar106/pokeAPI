import { Request, Response } from 'express';
import {  usersServices } from '../../services';

interface CustomRequest extends Request {
    user?: { id :string }
  }




export const updateUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id_user } = req.params;
        const { phone_number, email, role_id } = req.body;

        const updatedUser = await usersServices.UpdateUserService({ id_user, phone_number, email, role_id })

        return res.status(200).json({ message: 'Successfully updated user', data: updatedUser })
    } catch (error: any) {
        console.error('Error updating user:', error)

        const errorMessage = error.message || 'Internal server error'
        return res.status(500).json({ message: errorMessage })

    }
}

export const updateUserStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id_user } = req.params;
        const { state_id } = req.body;

        const updatedUserStatus = await usersServices.UpdateStatusService({ id_user, state_id })

        return res.status(200).json({ message: 'Successfully updated status user', data: updatedUserStatus })
    } catch (error: any) {
        console.error('Error updating status user:', error)

        const errorMessage = error.message || 'Internal server error'
        return res.status(500).json({ message: errorMessage })
    }
}



export const updatePasswordController = async(req: CustomRequest, res: Response) : Promise<any> => {
    try {
        const id_user = req.user?.id;
        const userUpdate = await usersServices.updatePasswordService(id_user as string , req.body);
        
        return res.status(200).json({ message: 'Password updated successfully',userUpdate });
    }catch (error: any) {
        console.error('Error updating password:', error);
        const errorMessage = error.message || 'Internal server error';
        return res.status(500).json({ message: errorMessage });
    }
}

