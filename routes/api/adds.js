var express = require('express');
var router = express.Router();
const Adds = require('../../models/add');
const { query, param, validationResult } = require('express-validator');

//GET api/adds


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
        res.json({results : addsResults});

    } catch (error){
        next(error);
    }
});



//GET api/adds/<_id> Return a single add by id reference

router.get('/:id',[
    param('id').isLength({min:24, max:24}).withMessage("Id is not correct or does not have 24 characters long")
], 
    async function (req, res, next){
    try {
        validationResult(req).throw();
        const filterId = req.params.id;

        const addResult = await Adds.findById(filterId); //api/adds/65e3903571fd11524fe63bc9

        res.json({result: addResult});

    } catch (error) {
        next(error)
    }
});


//POST api/adds (body)
//Create a new add

router.post('/', async function(req, res, next){
    try {
        const dataAdd = req.body;

        const add = new Adds(dataAdd); ///api/adds

        const addSaved = await add.save();

        res.json({result: addSaved});
    } catch (error) {
        next(error);
    }
});
module.exports = router;

//DELETE api/adds/delete/<_id>

router.delete('/delete/:id', async function(req, res, next){
    try {
        const id = req.params.id;

        await Adds.deleteOne({ _id: id});

        res.json(); //

    } catch (error) {
        next(error);
    }
});
