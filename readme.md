# API NODEPOP
Maintains advertisements for buying or selling items and allows searching by setting filters by various criteria such as:

- List of ads with the possibility of pagination. With filters by tag, type of ad (sale or search), price range (min. price and max. price) and item name
- List of existing tags
- Ad creation

# Technologies
Database is in Mongo DB 
Nodejs is use to build the proyect
NoSQLBooster 
PostMan


# Installation

Setted in environment variables for Android and IOS systems.
 ` "scripts": {
    "start": "cross-env NODEPOP_ENV=production node ./bin/www",
    "dev": "cross-env NODEPOP_ENV=development DEBUG=nodepop:* nodemon ./bin/www"
  } `

1.- Clone this repository.
2.- Run `npm install` to install the dependencies.
3.- Install nodemon `npm nodemon --save-dev`
4.- Install Mongoose to give structure to MongoDB `npm install mongoose`
5.- Run dev mode in port 3000 by default: `npm run dev`


# Starting with API
* Warning!!!!
This command `npm run init-db` will erase the database and automatically load a couple of ads.

1.- Run npm run init-db to start THE API ONCE and automatically load a bunch of ads. (EYE! READ WARNING)
2.- Run npm run dev to access the API at http://localhost:3000.
3.- In NoSQLBooster the database will be created at localhost/dbadds/adds
4.- The schema is: name: String, sales: Boolean, price: Number, photo: String, tags: [String]
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

# API routes and CRUD

Postman can be used to test the methods. 

## Filters

```
Filter by name:
http://127.0.0.1:3000/api/adds?name=nintendo

Filter by name("ni" is included in the name of product):
http://127.0.0.1:3000/api/adds?name=ni

Filter by sales (boolean -true or false):
http://127.0.0.1:3000/api/adds?sales=true

Filter by price:
http://127.0.0.1:3000/api/adds?price=20

Filter by range of price (returns articles between that range of prices):
http://127.0.0.1:3000/api/adds?priceRange=5-20

Filter by tags:
http://127.0.0.1:3000/api/adds?tags=lifestyle&tags=motor

Filter by id:
http://127.0.0.1:3000/api/adds/65e3903571fd11524fe63bc9

Filter by tags:
http://127.0.0.1:3000/tags

Sort by price ascending:
http://127.0.0.1:3000/api/adds?sort=price

Sort by price desscending:
http://127.0.0.1:3000/api/adds?sort=-price

Combination of filters:
http://127.0.0.1:3000/api/adds?sales=true&tags=mobile

Delete:
http://127.0.0.1:3000/api/adds/65e3903571fd11524fe63bdc
Reply Postman with status200
```
# Validations
All included in routes/api/tags in the main method

# Contribution
If you want to contribute, follow these steps:

1.-Fork this repository.
2.- Create a new branch for your feature or fix.
3.- Make your changes and create a pull request.

# License
This project is open to collaboration.
