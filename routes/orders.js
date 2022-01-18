// ORDERS ROUTES
const express = require("express")
const router = express.Router()
const Order = require("./../models/Orders")
//const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  'sk_test_51KItkLKHNoE5NY8LKOc2yS59ztSCqXT1dmIZb51LjY05XGE5uVFAdkzKtxi6aSoCvREllrf8VWw5o9tGBxuCh9bo00IaesWPCk'
);


// GET all orders
router.get('/', (req, res) => {
    // get all orders from the orders model using the find() method
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            console.log("Problem getting orders", err)
        })
})





// POST - create new order ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "orders content is empty"
        })
    }

    // create pairings if req above is good and data is in the body
    const newOrder = new Order({
        name: req.body.name,
        email: req.body.email,
    //    userid: req.body._id

    //        name: currentUser.name,
    //        email: currentUser.email
    //        userid: currentUser._id,
    //        orderItems: cartItems,
    //        orderAmount: subtotal
    })

    // save newPairings document to the database
    newOrder.save()
        .then((order) => {
            // send back 201 status and new pairings object
            res.status(201).json(order)
        })
        .catch((err) => {
            console.log("error getting order", err)
            res.status(500).json({
                message: "problem getting order",
                error: err
            })
        })
})






router.post("/placeorder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;
  
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
  
      const payment = await stripe.charges.create(
        {
          amount: subtotal * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
      );
  
      if (payment) {
        const neworder = new Order({
          name: currentUser.name,
          email: currentUser.email,
          userid: currentUser._id,
          orderItems: cartItems,
          orderAmount: subtotal,
          shippingAddress: {
            street: token.card.address_line1,
            city: token.card.address_city,
            country: token.card.address_country,
            pincode: token.card.address_zip,
          },
          transactionId: payment.source.id,
        });
  
        neworder.save();
  
        res.send("Order placed successfully");
      } else {
        res.send("Payment failed");
      }
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" + error });
    }
  });

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
/*
router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
*/
module.exports = router;
