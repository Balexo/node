const mongoose = require('mongoose');

//Schema of adds
const addsSchema= mongoose.Schema({
    name: {type:String, required:true, index: true},
    sales: {type:Boolean, required:true, index: true},
    price: {type:Number, required:true, index: true},
    photo: {type:String},
    tags: {type:[String], required:true, index: true}
})


//List method
addsSchema.statics.toList = function(filter, skip, limit, sort, fields) {
  const query = Adds.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

//Create adds Schema
const Adds = mongoose.model('Adds', addsSchema);

module.exports= Adds;