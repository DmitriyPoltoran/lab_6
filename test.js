const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { OrderModel } = require('./database')

const app = require("./index");
const { order, differentOrder } = require("./constants");

const orderKeys = Object.keys(order);

chai.use(chaiHttp);
const expect = chai.expect;

describe("Post", () => {
    it("Should create a new order", async () => {
      new OrderModel(order)
      console.log(await OrderModel.find());
  
      const res = await chai
        .request(app)
        .post("/orders")
        .send(order);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, orderKeys)).to.deep.equal(order);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/orders")
        .send(order)
  
      createdorder = response.body;
    });
  
    it("Should get all orders", async () => {
      const res = await chai
        .request(app)
        .get("/orders");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(order => order._id === createdorder._id)).to.be.true;
    });
  
    it("Should get one order by id", async () => {
      const res = await chai
        .request(app)
        .get(`/orders/${createdorder._id}`);
      expect(res.body).to.deep.equal(createdorder);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/orders")
        .send(order)
  
        createdorder = response.body;
    });
  
    it("Should update(patch) order by id", async () => {
      const difference = { price: "3123123$"}
  
      const res = await chai
        .request(app)
        .patch(`/orders/${createdorder._id}`)
        .send(difference);
  
      expect(res.body).to.deep.equal({ ...createdorder, ...difference });
    });
  
    it("Should update(put) order by id", async () => {
      const res = await chai
        .request(app)
        .put(`/orders/${createdorder._id}`)
        .send(differentOrder);
  
      expect(res.body).to.deep.equal({ ...createdorder, ...differentOrder });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/orders")
        .send(order)
  
        createdorder = response.body;
    });
  
    it("Should delete order by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/orders/${createdorder._id}`);
  
      expect(res.body).to.deep.equal(createdorder);
    });
  })