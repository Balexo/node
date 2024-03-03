var express = require('express');
var router = express.Router();
const Adds = require('../../models/add');
const { query, param, validationResult } = require('express-validator');

//GET api/adds


router.get('/', async function (req, res, next) {
    try{
        validationResult(req).throw();
        const filter = {};

        // Filters
        const filterName = req.query.name ? req.query.name.toLowerCase() : null;
        const filterSales = req.query.sales ? req.query.sales.toLowerCase() : null; ///api/adds?price=20
        const filterPrice = req.query.price ? req.query.price : null;
        const filterTags = req.query.tags ? req.query.tags.toLowerCase() : null;
        const fiterRangePrice = req.query.price ? req.query.price : null;

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

        if(fiterRangePrice){
            const [minPrice, maxPrice] = fiterRangePrice.split('-').map(Number);
            filter.price = {$gte: minPrice, $lte:maxPrice};
        }

        const addsResults = await Adds.toList(filter, skip, limit, sort);
        res.json({results : addsResults});

    } catch (error){
        next(error);
    }
});

//GET api/adds/<_id> Return a single add by id reference

router.get('/:id', async function (req, res, next){
    try {
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

router.delete('/:id', async function(req, res, next){
    try {
        const id = req.params.id;

        await Adds.deleteOne({ _id: id});

        res.json(); //

    } catch (error) {
        next(error);
    }
});
