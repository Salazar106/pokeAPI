import { Request, Response, NextFunction } from "express";
import { db } from "../config";

interface AuthRequest extends Request {
    user?: { id: string };
}

const hasRole = (roles: string[]) => async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found in request" });
            return;
        }

        const { id } = req.user;

        // Buscar el rol del usuario en la base de datos
        const user = await db.users.findUnique({
            where: { id_user: id },
            select: { role: true },
        });

        if (!user || !user.role) {
            res.status(404).json({ message: "User not found or role not assigned." });
            return;
        }

        const { name } = user.role;

        // Verifica si el rol del usuario está en la lista de roles permitidos
        if (!roles.includes(name)) {
            res.status(403).json({ message: "Forbidden: You do not have the required role" });
            return;
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default hasRole;
