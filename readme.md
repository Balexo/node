# API NODEPOP

Maintains advertisements for buying or selling items and allows searching by setting filters by various criteria such as:

# Technologies

- Database: MongoDB
- Backend: Node.js
- Tools: NoSQLBooster, Postman

## Setup and Usage

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the server in development mode on port 3000.
4. (Optional) Run `npm run init-db` to initialize the database with sample data. **Warning: This will erase the existing database.**
5. Schema of an ad:

```JSON
 "_id": "65e3903571fd11524fe63bc9",
            "name": "patinete",
            "sales": true,
            "price": 230.15,
            "photo": "patinete.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
```

## Features

- List of ads with pagination and filters (tag, type, price range, name).
- List of existing tags.
- Ad creation.

# Authentication

This project uses JSON Web Tokens (JWT) for authentication. The `jwtAuthMiddleware` verifies the JWT provided in the request. If the token is not provided or is invalid, it sends a 401 error. If the token is valid, it adds the user ID from the token payload to the request object.

## Routes

The routes for the API are defined in app.js. The jwtAuthMiddleware is used in the routes for /api/adds and /api/createAd to protect these routes

# API routes and CRUD

Postman can be used to test the methods. Check the `API-Guide.md` for detailed information on API routes and CRUD operations

# Microservices

This project contains microservice to transform an image in thumbnail 100x100px: `img-res` and `create-ad`. Use `npm run img-res` and `npm run create-ad` to start these services in development mode. Both need to be run at the sime time.

# Localization

This project uses the `i18n` module for localization. The locales directory contains the translation files for each supported locale.

# Contribution

If you want to contribute, fork this repository, create a new branch for your feature or fix, make your changes, and create a pull request.

# License

This project is open to collaboration.
