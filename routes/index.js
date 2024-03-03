var express = require('express');
var router = express.Router();
const Adds = require('../models/add');
const { query, validationResult } = require('express-validator');

// GET home page. 
 
router.get('/', [
    query('name').optional().notEmpty().withMessage("Name cannot be empty"),
    query('price').optional().isNumeric().withMessage("Price must be a number"),
    query('sales').optional().isIn(['true', 'false']).withMessage("Sales is boolean -true or false"),
    query('tags').optional().isIn(['work', 'lifestyle', 'motor', 'mobile']).withMessage("Tags must be chosen from this list: 'work', 'lifestyle', 'motor', 'mobile'")
], async function (req, res, next) {
    try{
        validationResult(req).throw();
        const filter = {};

        // Filters
        const filterName = req.query.name ? req.query.name.toLowerCase() : null;
        const filterSales = req.query.sales ? req.query.sales === 'true' : null; 
        const filterPrice = req.query.price ? req.query.price : null; 
        const filterTags = req.query.tags ? req.query.tags.toLowerCase() : null;
        const filterRangePrice = req.query.priceRange ? req.query.priceRange : null;

        //Paging
        const skip = req.query.skip; 
        const limit = req.query.limit;

        // Ordering
        const sort = req.query.sort; 

        if(filterName){
            filter.name = { $regex: new RegExp(filterName), $options: 'i'};
        }

        if(filterSales){
            filter.sales = filterSales;
        }

        if(filterPrice){
            filter.price = Number(filterPrice);
        }

        if(filterTags){
            filter.tags = filterTags;
        }

        if(filterRangePrice){
            const [minPrice, maxPrice] = filterRangePrice.split('-').map(Number);
            filter.price = {$gte: minPrice, $lte:maxPrice};
        }

        const addsResults = await Adds.toList(filter, skip, limit, sort);
        res.render('index', {title: 'Nodepop', results : addsResults});

    } catch (error){
        next(error);
    }
});




module.exports = router;
