const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipping_orderSchema = new Schema({
  //Orden de compra
  imported_id: String,
  order_price: String,
  n_packages: String,
  content_description: String,
  type: String,
  weight: String,
  volume: String
});

//Destino compra
//Customer
const customerSchema = new Schema({
  
  name: String,
  phone: String,
  email: String
  }
);

//Home address
const home_addressSchema = new Schema({
  place: String,
  full_address: String
});

//Delivery Address
const delivery_addressSchema = new Schema({
  home_address: home_addressSchema
  }
);

//Shipping Destination Schema
const shipping_destinationSchema = new Schema({
  customer: customerSchema,
  delivery_address: delivery_addressSchema
  }
);

//Shipping Origin Schema
const shipping_originSchema = new Schema({
  warehouse_code: String
  }
);

//Carrier Schema
const carrierSchema = new Schema({
  carrier_code: String,
  tracking_number: String
  }
);

//Registro Schema
var registroSchema = new Schema({
  shipping_order: shipping_orderSchema,
  shipping_destination: shipping_destinationSchema,
  shipping_origin: shipping_originSchema,
  carrier: carrierSchema
});

  module.exports = mongoose.model('registros', registroSchema);