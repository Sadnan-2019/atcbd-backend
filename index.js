const express = require("express");
const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;
const authRoutes = require("./routes/auth");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", authRoutes);

// const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`ATCL Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

async function run() {
  try {
    console.log("atcl database conneted");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello FROM  ATCL    World!");
});
