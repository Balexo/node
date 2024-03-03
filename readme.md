
# Nombre de la API

Mantiene anuncios de compra o venta de artículos y permite buscar como poner filtros por varios criterios tales como:(valida para desarrollos en iOS o Android)
- Lista de anuncios con posibilidad de paginación. Con filtros por tag, tipo de anuncio
(venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo
- Lista de tags existentes
- Creación de anuncio

# NodeApp

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

    * Aviso!!!!
    Este comando `npm run init-db` borrará la base de datos y cargará un par de anunciós automáticamente.

1. Ejecuta `npm run init-db` para iniciar **UNA SOLA VEZ LA API**  y cargar un par de anuncios automáticamente. (OJO! LEER AVISO)
2. Ejectua `npm run dev` para acceder a la API en `http://localhost:3000`.
3. En NoSQLBooster se creará la base de datos en `localhost/dbadds/adds`
4. El schema es:
`nombre: String,
venta: Boolean,
precio: Number,
foto: String,
tags: [String]`

## API

Agent list

GET api/agentes

```json

```

## Endpoints

- `/usuarios`: Obtiene una lista de usuarios.
- `/usuarios/:id`: Obtiene un usuario específico por ID.
- `/productos`: Obtiene una lista de productos.

## Contribución

Si deseas contribuir, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama para tu función o corrección.
3. Realiza tus cambios y crea un pull request.

## Licencia

Este proyecto está abierto a colaboración. 
