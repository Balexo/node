var express = require('express');
var router = express.Router();
const Adds = require('../models/add');
const { query, validationResult } = require('express-validator');

// GET home page. 
 
router.get('/', async function (req, res, next) {
  try{
      validationResult(req).throw();
      const filter = {};

      // Filters
      const filterName = req.query.name ? req.query.name.toLowerCase() : null;
      const filterSales = req.query.sales ? req.query.sales.toLowerCase() : null;
      const filterPrice = req.query.price ? req.query.price.toLowerCase() : null; 
      const filterTags = req.query.tags ? req.query.tags.toLowerCase() : null;

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
          filter.price = filterPrice;
      }

      if(filterTags){
          filter.tags = { $in: [filterTags]};
      }

      const addsResults = await Adds.toList(filter, skip, limit, sort);
      res.render('index', {title:'NODEPOP', results : addsResults});
  } catch (error){
      next(error);
  }
});


module.exports = router;
