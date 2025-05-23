# Prueba Full stack Nestjs y Angular
Web y back end con CRUD para diferentes tablas, Guard para rutas , autenticacion con JWT para consumo de la API y documentacion con Swagger

# Probar proyecto
El front esta desplegado en Netlify, con la url: https://steady-fudge-bd5bc5.netlify.app
El back esnta alojado en render

Para ingresar : 
usuario admin: admin@correo / 123456
usuario normal: user@correo.com / 123456

Los usuarios con rol 'admin' pueden hacer todo el CRUD de comañias, usuarios y productos
LÑos usuarios con rol 'user' solo pueden ver y se bloqeuo la ruta de ver usuarios por Guard para 

## Tecnologías utilizadas

### Frontend

- **Angular 19** (standalone components)
- **Tailwind CSS** (interfaz moderna y responsiva)
- **Reactive Forms**
- **HTTP Interceptors** (token y errores)
- **Guards dinámicos** (`AuthGuard` + `RoleGuard`)
- **Manejo de errores con alertas visuales**
- **Componentes reutilizables**: modales, dropdowns, alertas

### Backend

- **NestJS + TypeORM**
- **Autenticación JWT**
- **Roles (`admin`, `user`)**
- **Swagger** (documentación API)
- **Relaciones SQL** (1:N entre Compañía → Productos/Usuarios)
- **Seeders** para cargar departamentos y ciudades desde JSON
- **MySQL** / PostgreSQL compatible


## Intalacion

### Ejecutar backend


```bash
cd backend
npm install

## Crea un archivo .env basado en .env.example
## Y aesta conectada con uan base alojada en AWS,
cp .env.example .env 

## Si implementa su propia base de datos y esta bacia usar el seeder para los datos iniciales, descometa las lineas 
## // const seeder = app.select(SeedModule).get(SeederService);
## // await seeder.seed();
## qeu estan main.ts

npm run start
```

###  Ejecutar frontend

abrir una nueva consola en la raiz del proyecto y ejecutar

```bash
cd frontend
npm install
ng serve
```


