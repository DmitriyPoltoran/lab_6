const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { OrderModel } = require('./database')

app.use(bodyParser.json());

app.post("/orders", async (req, res) => {
    try {
      const order = new OrderModel(req.body);
      await order.save();
      res.status(201).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/orders", async (req, res) => {
    try {
      const orders = await OrderModel.find();
      res.send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/orders/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const order = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        return res.status(404).send("Order not found");
      }
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.patch("/orders/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const order = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        return res.status(404).send("Order not found");
      }
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/orders/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const order = await OrderModel.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3000, () => {
    console.log('Starting the server on port 3000');
});

module.exports = app;
