## Generalidades del BACK 

# para correr el proyecto del Front solo debemos instalar dependencias con 
```bash
npm install
```

## Tenemos que tener un servicio de Mysql para poder generar migraciones
# debemos de poner las varianles de entorno 

PORT=3000
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_USER=dalusaga4@gmail.com
MAILER_PASSWORD=dqyq brso ccoi dejt
JWT_SECRET=c7e8352bc9ec5c7b9ab6613a066a0ec5340fe6bbdffb4d086a633d88ff9a7901
DATABASE_URL="mysql://root:@localhost:3306/Pokeapi"   // importante cambiarlo por la URL de tu base de datos
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000/api

### Generamos migraciones, depues de --name agregar el nombre de la migracion que deseamos generar:
```bash
npx prisma migrate dev --name name_migrate  
```
## en caso de no hacer la migracion de los datos ejecutar:
```bash
npm run seed
```
### Prisma studio for manage DB
```bash
npx prisma studio 
```

# luego ejecutamos el proyecto con 
```bash
npm run dev
```
