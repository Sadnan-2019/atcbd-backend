const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
// const port = process.env.PORT || 5000;
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`ATCL Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
// console.log(MONGO_URI)

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// console.log('MONGO_URI:', process.env.MONGO_URI); 

 
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err.message));








async function run() {
  try {
    await client.connect();
    console.log("atcl database conneted");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello FROM  ATCL    World!");
});

 
