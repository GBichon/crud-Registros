const express = require('express');
const router = express.Router();
const faker = require('faker');
const Registro = require('../models/registro')

//Home
router.get('/', async (req, res) => {
  const registros = await Registro.find();
  res.render('index', {
  registros
  });
});

//Endpoint fake data: Add 10 random data
router.get('/dbfake', async (req, res) => {
  for (let id = 0; id < 10; id++) {
    const shpOrd = {
      imported_id		: faker.address.zipCode(),
      order_price         : faker.commerce.price(),
      n_packages          : "1",
      content_description : faker.commerce.productName(),
      type               : "delivery",
      weight              : "0.1",
      volume              : "5.001"
    };
  
    const customer = {
      name : faker.name.findName(),
      phone : faker.phone.phoneNumberFormat(),
      email : faker.internet.email()
    };
  
    const homeAdress = {
      place        : faker.address.city(),
      full_address : faker.address.streetAddress()
    };
  
    const shpOrigin = {
      warehouse_code : "cod_bod"
    };
  
    const carrier = {
      carrier_code : "BLX",
      tracking_number: faker.address.zipCode()
    };

    var registro = new Registro({shipping_order: shpOrd,
                              shipping_destination:{customer:customer ,delivery_address :{home_address: homeAdress} },
                              shipping_origin:shpOrigin,
                              carrier: carrier
    });
    registro.save();
  }

  console.log(registro)
  res.redirect('/');
});

//Test1 challenge
router.post('/test1', async (req, res, next) => {

  const newEnvio = { ...req.body};
  const shpOrd = newEnvio["shipping_order"];
  const customer = newEnvio["shipping_destination"]["customer"];
  const homeAdress = newEnvio["shipping_destination"]["delivery_address"]["home_address"];
  const shpOri = newEnvio["shipping_origin"];
  const carrier = newEnvio["carrier"];
  var registro = new Registro({shipping_order: shpOrd,
    shipping_destination:{customer:customer ,delivery_address :{home_address: homeAdress} },
    shipping_origin:shpOri,
    carrier: carrier
  });

  await registro.save();
  res.redirect('/');
});

//List Register
router.get('/listar', async (req, res) => {
  const registros = await Registro.find();
  res.render('index', {
    registros
  });
  
});

//Details
router.get('/details/:id', async (req, res, next) => {
  const registro = await Registro.findById(req.params.id);

  res.render('details', { registro });
});

//Edit- Get
router.get('/edit/:id', async (req, res, next) => {
  const registro = await Registro.findById(req.params.id);

  res.render('edit', { registro });
});

//Edit- Post
router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  const registro = await Registro.findById(req.params.id);
 
  const shpOrd = {
    imported_id		: req.body.imported_id,
    order_price         : req.body.order_price,
    n_packages          : req.body.n_packages,
    content_description : req.body.content_description,
    type               : req.body.type,
    weight              : req.body.weight,
    volume              : req.body.volume
  };

  const customer = {
    name : req.body.name,
    phone : req.body.phone,
    email : req.body.email
  };

  const homeAdress = {
    place        : req.body.place,
    full_address : req.body.full_address
  };

  const shpOrigin = {
    warehouse_code : req.body.warehouse_code
  };

  const carrier = {
    carrier_code : req.body.carrier_code,
    tracking_number: req.body.tracking_number
  };

  registro.shipping_order = shpOrd;
  registro.shipping_destination.customer = customer;
  registro.shipping_destination.delivery_address.home_address = homeAdress;
  registro.shipping_origin = shpOrigin;
  registro.carrier = carrier;

  await registro.save()
  res.redirect('/');
});

//Delete
router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Registro.remove({_id: id});
  res.redirect('/');
});


module.exports = router;