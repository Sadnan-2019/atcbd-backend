const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/categoryRoutes");
const teamRoutes = require("./routes/teamRoutes");
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
// Static folder for serving uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);
 
// app.use('/api/services', serviceRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/team", teamRoutes);
const newsRoutes = require('./routes/newsRoutes');
app.use('/api/news', newsRoutes);

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
app.get("/railway", (req, res) => {
  res.send("Backend running on Railway!");
});
app.get("/", (req, res) => {
  res.send("Hello FROM  ATCL    World!");
});
