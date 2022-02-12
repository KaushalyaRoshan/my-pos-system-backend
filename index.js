const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

connectDB().catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/pos-system");
}

app.use(express.json());

const orderSchema = new mongoose.Schema({
  _id: String,
  no: Number,
  ebayOrderDate: String,
  aliExpressOrderDate: String,
  productName: String,
  ebayURL: String,
  productSupplierURL: String,
  supplierStoreURL: String,
  ebayOrderNumber: String,
  aliexpressOrderNumber: String,
  buyerName: String,
  email: String,
  buyerUserName: String,
  buyerURL: String,
  address: {
    shipTo: String,
    street: String,
    city: String,
    stateOrProvince: String,
    zipCode: String,
    country: String,
    phoneNumber: String,
  },
  trackingNumber: String,
  ebayCarrier: String,
  carrier: String,
  estimatedDeliveryTime: String,
  orderStatus: String,
  actualDeliveryTime: String,
  itemQuantity: Number,
  itemCost: Number,
  shippingCharge: Number,
  shippingCost: Number,
  aliexpressTax: Number,
  discount: Number,
  totalCost: Number,
  ebayFee: Number,
  otherFee: Number,
  soldPrice: Number,
  profit: Number,
  totalCostLKR: Number,
  usdToLKR: Number,
});
const Order = mongoose.model("order", orderSchema);

async function getOrders() {
  return await Order.find();
}

app.get("/orders", async (req, res) => {
  const orders = await getOrders();
  res.send(orders);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
