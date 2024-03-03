var express = require('express');
var router = express.Router();
const Adds = require('../../models/add');
const { query, param, validationResult } = require('express-validator');

//GET api/adds
//Return full list of adds

router.get('/', async function (req, res, next) {
    try{
        validationResult(req).throw();
        const filter = {};

        // Filters
        const filterName = req.query.name ? req.query.name.toLowerCase() : null;
        const filterSales = req.query.sales ? req.query.sales.toLowerCase() : null; ///api/adds?price=20
        const filterPrice = req.query.price ? req.query.price.toLowerCase() : null;
        const filterTags = req.query.tags ? req.query.tags.toLowerCase() : null;

        //Paging
        const skip = req.query.skip; //api/adds?skip=5&limit=10
        const limit = req.query.limit;

        // Ordering
        const sort = req.query.sort; //api/adds?sort=price

        if(filterName){
            filter.name = { $regex: new RegExp(filterName), $options: 'i'};
        }

        if(filterSales){
            filter.sales = filterSales;
        }

        if(filterPrice){
            filter.price = filterPrice;
        }

        if(filterTags){
            filter.tags = { $in: [filterTags]};
        }

        const addsResults = await Adds.toList(filter, skip, limit, sort);
        res.json({results : addsResults});
    } catch (error){
        next(error);
    }
});



module.exports = router;
