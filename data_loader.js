require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const MongoClient = require("mongodb").MongoClient;

// CSV file path
const csvFilePath = "dummy_product.csv";

// MongoDB collection name
const collectionName = "products";

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", async (row) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_DB_URL);
      const db = client.db();
      const collection = db.collection(collectionName);

      await collection.insertOne(row);

      client.close();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  })
  .on("end", () => {
    console.log("CSV data successfully inserted into MongoDB.");
  });
