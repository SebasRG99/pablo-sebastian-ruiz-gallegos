# Pablo Sebastian Ruiz Gallegos - Prueba Técnica para Tendencys Innovations

Esta es la prueba técnica de Pablo Sebastian Ruiz Gallegos. A continuación, se explica cómo levantar el proyecto.

## Configuración del Proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/SebasRG99/pablo-sebastian-ruiz-gallegos.git
   ```

2. Instalar Docker en su computadora. Esto ayudará a evitar problemas con las bases de datos al momento de ejecutar el programa.

3. Ejecutar el siguiente comando en la terminal para crear un contenedor de MySQL:
   ```
   docker run --name tendencys_db -e MYSQL_ROOT_PASSWORD=tendencys -e MYSQL_DATABASE=tendencys -p 3306:3306 -d mysql:latest
   ```

4. Desde la terminal, navegar a la carpeta `/src` y ejecutar los siguientes comandos:
   ```
   npx prisma generate
   npx prisma db push
   ```
   Esto generará los schemas de Prisma y creará las tablas en MySQL.

5. Instalar las dependencias necesarias:
   ```
   npm install
   ```
   Nota: Asegúrese de tener Node.js instalado. La versión utilizada en este proyecto es v21.6.2.

6. Iniciar el proyecto:
   ```
   npm run dev
   ```

## Uso de las APIs

El servidor correrá por defecto en `http://localhost:3000`. Se han creado dos prefijos para las rutas: "products" y "auth".

### Rutas de Autenticación

- **Registro de Usuario**: 
  - Ruta: `POST http://localhost:3000/auth/signIn`
  - Ejemplo de body:
    ```json
    {
      "name": "Pablo Sebastian",
      "phone": "123456",
      "password": "123456",
      "img_profile": "https://example.com/pablo.png"
    }
    ```

- **Inicio de Sesión**:
  - Ruta: `POST http://localhost:3000/auth/login`
  - Ejemplo de body:
    ```json
    {
      "phone": "123456",
      "password": "123456"
    }
    ```
  - Devuelve un token necesario para las rutas de productos.

### Rutas de Productos

Todas las rutas de productos requieren un token de autorización. En Postman, agregar en Headers: `Authorization: Bearer <token>`

1. **Obtener todos los productos**:
   - `GET http://localhost:3000/products/all`

2. **Obtener productos por IDs**:
   - `GET http://localhost:3000/products/batch?ids=1,2,3,4,...,n`

3. **Crear productos**:
   - `POST http://localhost:3000/products/batch`
   - Ejemplo de body:
     ```json
     [
       { "name": "Producto 1", "description": "Desc 1", "height": 10, "length": 20, "width": 5 },
       { "name": "Producto 2", "description": "Desc 2", "height": 15, "length": 25, "width": 8 }
     ]
     ```

4. **Actualizar productos**:
   - `PUT http://localhost:3000/products/batch`
   - Ejemplo de body:
     ```json
     [
       {"id":"cm27hhlkp0000rq590v5itgma","name": "Producto 1 Actualizado", "width": 50, "height":40, "length":33},
       {"id":"cm27hhlkv0001rq593uzmqojn","name": "Producto 2 Actualizado", "width": 60, "height":20, "length":66}
     ]
     ```

5. **Eliminar productos específicos**:
   - `DELETE http://localhost:3000/products/batch`
   - Ejemplo de body:
     ```json
     { "ids": ["cm27hhlkv0001rq593uzmqojn", "cm27hhlkp0000rq590v5itgma"] }
     ```

6. **Eliminar todos los productos**:
   - `DELETE http://localhost:3000/products/all`