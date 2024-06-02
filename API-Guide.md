# API Routes and CRUD

Postman tool is required

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
