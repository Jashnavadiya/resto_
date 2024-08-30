require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const connect_to_db = require("./config/db.config.js");
const cors = require("cors");
const Resto = require("./models/resto.js")

connect_to_db();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173' // Your frontend origin
}));

// Increase the limit for JSON payloads
app.use(express.json({ limit: '50mb' })); // Adjust as needed
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded payloads


app.use("/api/v1/food", require("./routes/food.routes.js"));
app.use("/api/v1/category", require("./routes/category.routes.js"));
app.use("/api/v1/event", require("./routes/events.routes.js"));



app.post("/addResto", async (req,res) => {
  try{
    console.log(req.body)
    const data = new Resto(req.body)
    await data.save()
    res.status(201).json(data)
  }
  catch(err){
    console.log(err)
  }
})
app.get("/addResto/:restoId", async (req,res) => {
  try{
    const data = await Resto.findById(req.params.restoId)
    res.status(201).json(data)
  }
  catch(err){
    console.log(err)
  }
})


app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
app.listen(port,  () => {
  console.log(`Server Running at Port ${port}`);
});