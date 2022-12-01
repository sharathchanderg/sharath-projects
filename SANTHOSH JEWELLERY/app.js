const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const port = process.env.SJ_PORT;

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://${process.env.SJ_DB_USERNAME}:${process.env.SJ_DB_PASSWORD}@cluster0.gfc0ofu.mongodb.net/${process.env.SJ_DB_NAME}`
  )
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database not Connected!!");
  });
app.get("/",(req,res)=>{
  res.status(200).send("I am listening from server");
})
const adminRoute = require("./routers/Admin/admin.router");

app.use("/santhosh-jewellery", adminRoute);

app.listen(port, () => {
  console.log(`server running on http://127.0.0.1:${port}`); 
});
 