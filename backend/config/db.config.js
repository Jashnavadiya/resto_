const mongoose = require("mongoose");

const URL = process.env.MONGO_DB_URL;

const connect_to_db = () => {
  mongoose.connect(URL).then(() => console.log("db connected."));
};

module.exports = connect_to_db;