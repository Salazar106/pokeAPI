import { db } from '../../config'
import { generateHashedPassword } from '../../utils/hashPassword.utils'
// import { generateJWT } from '../../utils'
// import { IUserRegister } from '../../interfaces'

export interface IUserRegister {
    name: string
    last_name: string
    email: string
    document_type: string
    document_number:string
    phone_number: string
    state_id: boolean
    password: string
  }


export const register = async (userInformation: IUserRegister) => {
    try {
        const { name, last_name, email, phone_number, state_id, password } = userInformation;

        const existingUser = await db.users.findFirst({ where: {email}});
        if (existingUser) throw new Error(`User with email ${email} already exists.`); //validate email uniqueness
        

        const createdUser = await db.users.create({
            data: {
                name,
                last_name,
                email,
                phone_number,
                state_id,
                credentials: {
                    create: {
                        password: await generateHashedPassword(password),
                    }
                }
            },
        });

        return {
            message: "User registered successfully",
            data: {
                id: createdUser.id_user,
                email: createdUser.email,
            },
        };
    } catch (error:any) {
        throw new Error(error.message);  // Lanzamos el error con un mensaje detallado
    }
};
