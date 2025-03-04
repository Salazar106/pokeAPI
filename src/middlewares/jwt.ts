// import * as jwt from 'jsonwebtoken';

// // Define una interfaz para el usuario
// interface User {
//   name: string;
//   role: string;
//   idUser:string
// }

// // Función para crear el token
// export function createToken(user: User): Promise<string> {
//   const TOKEN_SECRET = process.env.JWT_SECRET as string;

//   if (!TOKEN_SECRET) {
//     throw new Error('JWT_SECRET no está definido en las variables de entorno.');
//   }

//   const payload = {
//     name: user.name,
//     role: user.role,
//     idUser: user.idUser
//   };

//   return new Promise((resolve, reject) => {
//     jwt.sign(
//       payload,
//       TOKEN_SECRET,
//       {
//         expiresIn: '12h',
//       },
//       (err:any, accessToken:string) => {
//         if (err || !accessToken) {
//           console.error('Error al crear el token:', err?.message, 'Payload:', payload);
//           return reject(new Error(`Error al crear el token: ${err?.message}`));
//         }
//         resolve(accessToken);
//       }
//     );
//   });
// }

// // Función para verificar el token
// export async function verifyToken(accessToken: string): Promise<jwt.JwtPayload | string | null> {
//   const TOKEN_SECRET = process.env.JWT_SECRET as string;

//   if (!TOKEN_SECRET) {
//     throw new Error('JWT_SECRET no está definido en las variables de entorno.');
//   }

//   console.log('Un usuario mantiene su sesión:', accessToken);

//   try {
//     const isValid = await jwt.verify(accessToken, TOKEN_SECRET);
//     const decoded = jwt.decode(accessToken);
//     return decoded;
//   } catch (error) {
//     throw new Error('Token no válido o expirado');
//   }
// }
