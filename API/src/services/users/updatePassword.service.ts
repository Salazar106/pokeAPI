import { db } from "../../config";
import { generateHashedPassword } from "../../utils/hashPassword.utils";
import bcrypt from 'bcryptjs';

export const updatePasswordService = async (id_user: string, data: { newPassword: string, confirNewPassword: string, oldPassword: string }) => {
    try {
        const { newPassword, confirNewPassword, oldPassword } = data;

        if (!oldPassword) throw new Error("La vieja Contraseña es requerida.");
        if (!newPassword) throw new Error("Nueva contraseña es requerida.");
        if (!confirNewPassword) throw new Error("Confirmar la nueva contraseña es requerida.");

        if (newPassword !== confirNewPassword) throw new Error('La contraseña nueva y su confirmación no coinciden.');

        const verifyOldPassword = await db.credentials.findFirst({ where: { user_id: id_user } });

        if (!verifyOldPassword?.password) throw new Error("Tu contraseña actual no coincide con la proporcionada.");

        const passwordValidation = await bcrypt.compare(oldPassword, verifyOldPassword.password);

        if (!passwordValidation) throw new Error("Tu contraseña actual no coincide con la proporcionada.");

        const isSamePassword = await bcrypt.compare(newPassword, verifyOldPassword.password);

        if (isSamePassword) throw new Error("La nueva contraseña no puede ser la misma que la anterior.");

        const hashedPassword = await generateHashedPassword(newPassword);
        const response = await db.credentials.update({ where: { user_id: id_user }, data: { password: hashedPassword } });

        return response;
    } catch (error: any) {
        console.error('Error updating password:', error);
        throw new Error(error.message);
    }
};