var express = require('express');
var router = express.Router();
const Adds = require('../../models/add');


//GET /tags 
//List of all tags

router.get('/', async function (req, res, next){
    try {
        const filterTags = await Adds.distinct("tags");
        res.json({result: filterTags});

    } catch (error) {
        next(error);
    }
});

module.exports = router;