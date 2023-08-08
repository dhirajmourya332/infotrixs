import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); //configure dotenv to add variables of .env file in process.env
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

for (let i = 0; i < 200; i++) {
  await DBClient.db("calculator")
    .collection("history")
    .insertOne({
      type: "root",
      expression: [
        { type: "number", value: 5 },
        { type: "decimal" },
        { type: "number", value: 3 },
        { type: "operator", operator_type: "addition" },
        {
          type: "function",
          function_type: "sin",
          expression: [
            { type: "constant", constant_type: "pie" },
            { type: "operator", operator_type: "multiplication" },
            { type: "bracket", bracket_type: "opening" },
            { type: "number", value: 8 },
            { type: "operator", operator_type: "addition" },
            { type: "number", value: 5 },
            { type: "bracket", bracket_type: "closing" },
          ],
        },
      ],
      result: 100,
    });
  console.log(i);
}

await DBClient.close();
