const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect("mongodb+srv://dimapautaran:w5fsFhnZwcGmSJnL@cluster0.rozq6zo.mongodb.net/", {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch((e) => {
    console.log(e,"Connection error");
    process.exit()
  });

  const Order = new Schema({
    title:String,
    owner: String,
    price:String,
    pay_method:String,
    quantity:Number,
  });
  
  const OrderModel = model('Order', Order);
  
  module.exports = {
    OrderModel
  }