/** @format */

const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperation.js");
const Customer = require("./dbFiles/customer.js");
const API_PORT = process.env.PORT || 5000;
const app = express();
const querystring = require("querystring");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/api", async (req, res) => {
  console.log("Called get customer");
  const result = await dbOperation.getCustomer();
  res.send(result.recordset);
});

app.post("/create", async (req, res) => {
  await dbOperation.createCustomer(req.body);
  const result = await dbOperation.getCustomer();
  console.log("Called create customer");
  res.send(result.recordset);
});

app.post("/customer/login", async (req, res) => {
  const result = await dbOperation.loginCustomer(
    req.body.FirstName,
    req.body.LastName
  );
  res.send(result.recordset);
});

app.post("/pcreate", async (req, res) => {
  await dbOperation.createProduct(req.body);
  const result = await dbOperation.getProduct();
  res.send(result.recordset);
});

app.get("/product", async (req, res) => {
  const result = await dbOperation.getProduct();
  res.send(result.recordset);
});

app.post("/product/id", async (req, res) => {
  const result = await dbOperation.getProductId(req.body.Id);
  res.send(result.recordset);
});

app.post("/product/delete", async (req, res) => {
  const result = await dbOperation.deleteProduct(req.body.Id);
  res.send(result);
});

app.post("/orders/delete", async (req, res) => {
  const result = await dbOperation.deleteOrder(req.body.Id);
  res.send(result);
});

app.get("/order", async (req, res) => {
  const result = await dbOperation.getOrder();
  res.send(result.recordset);
});

app.get("/my-orders", async (req, res) => {
  let CustomerId = req.query.CustomerId;
  const result = await dbOperation.getMyOrders(CustomerId);
  res.send(result.recordset);
});

app.post("/ocreate", async (req, res) => {
  const result = await dbOperation.createOrder(req.body);
  res.send(result.recordset);
});

app.post("/orders/update", async (req, res) => {
  const result = await dbOperation.updateOrder(req.body);
  res.send(result.recordset);
});

app.post("/products/update", async (req, res) => {
  const result = await dbOperation.updateProduct(req.body);
  res.send(result.recordset);
});


app.get("/orders/shipping-address/options", async (req, res) => {
  let CustomerId = req.query.CustomerId;
  const result = await dbOperation.getMyShippingAddresses(CustomerId);
  res.send(result.recordset);
});

app.get("/profit", async (req, res) => {
  const result = await dbOperation.getProfitTotal();
  res.send(result.recordset);
})

app.post("/profit/range", async (req, res) => {
  const result = await dbOperation.getProfitRange(req.body);
  res.send (result.recordset);
})

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
