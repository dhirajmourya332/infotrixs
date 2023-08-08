import cluster from "cluster";
import dotenv from "dotenv";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

if (cluster.isPrimary) {
  cluster.fork(); //initiating only one server instance of worker because load will be very low

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died with exit code ${code}`);
    cluster.fork(); //starting a new server instance when previous server instance dies
  });
} else {
  dotenv.config(); //configure dotenv to add variables of .env file in process.env

  const app = express(); //create express application

  app.use(cors());
  app.use(express.static("./public"));
  app.use(bodyParser.json()); //parse json body of requests

  let DBClient;
  try {
    //connecting mongodb
    const mongodbConnectionURI = process.env.MONGODB_CONNECTION_URI;
    DBClient = new MongoClient(mongodbConnectionURI);
    await DBClient.connect();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  //endpoint to get calculation history
  app.get("/calculation", async (req, res) => {
    const offset = Number(req.query["offset"]); //get history offset
    const limit = Number(req.query["count"]); //get number of history count to be fullfilled
    console.log(offset);
    try {
      const historyCursor = await DBClient.db("calculator")
        .collection("history")
        .find({})
        .sort({ created_at: -1 })
        .skip(offset || 0)
        .limit(limit <= 100 && limit > 0 ? limit : 15);

      res.setHeader("content-type", "Application/json");
      res.write(JSON.stringify(await historyCursor.toArray()));
      res.end();
    } catch (error) {
      console.log(error);
      res.sendStatus(500); //internal server error
    }
  });

  //endpoint to add calculation history
  app.post("/calculation", async (req, res) => {
    const doc = req.body;
    if (doc["expression"] === undefined && doc["result"] === undefined) {
      //check if doc has required fields
      res.sendStatus(400); //sendstatus 400(invalid request) if no doc in found
      return;
    }
    try {
      const writeAck = await DBClient.db("calculator")
        .collection("history")
        .insertOne({
          expression: doc["expression"],
          result: doc["result"],
          created_at: new Date(),
        });
      if (writeAck["acknowledged"]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); //internal server error
    }
  });

  //endpoint to delete a particular history
  app.delete("/calculation/:docId", async (req, res) => {
    const docId = req.params["docId"];
    try {
      if (!docId) {
        res.sendStatus(400); //send statuscode 400(invalid request) if no docId founc in url
      }
      const deleteAck = await DBClient.db("calculator")
        .collection("history")
        .deleteOne({ _id: new ObjectId(docId) });
      if (deleteAck["deletedCount"]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404); // send statuscode 404 (document not found) if can't find document with _id:docId and deletecount is 0
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // internal server error
    }
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log(
      `${new Date()}: Server started listning at port ${
        process.env.PORT || 5000
      }...`
    );
  });
}
