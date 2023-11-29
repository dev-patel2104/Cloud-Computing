import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const putItemAsync = promisify(dynamoDB.send).bind(dynamoDB);
const TABLE_NAME = "GroceryData";

export const handler = async (event) => {
  try {
    let params;
    const req = JSON.parse(event.body);

    if (!req.name || !req.category || !req.quantity || !req.status || !req.email || !req.grocery_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Not all the available data is present" }),
      };
    }

    const name = req.name;
    const category = req.category;
    const quantity = req.quantity;
    const status = req.status;
    const date = req.expiry_date;
    const email = req.email;
    const grocery_id = req.grocery_id;


    if (date) {
      params = {
        TableName: TABLE_NAME,
        Item: {
          email: { S: email },
          grocery_id: { S: grocery_id },
          name: { S: name },
          category: { S: category },
          quantity: { S: quantity },
          status: { S: status },
          expiry_date: { N: date.toString() },
        },
      };
    }
    else {
      params = {
        TableName: TABLE_NAME,
        Item: {
          email: { S: email },
          grocery_id: { S: grocery_id },
          name: { S: name },
          category: { S: category },
          quantity: { S: quantity },
          status: { S: status },
        },
      };
    }


    console.log("PutItem params:", params);

    await putItemAsync(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item put successfully" }),
    };
  } catch (err) {
    console.error("Error:", err);

    // Return a more informative error response
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: err.message || "An error occurred" }),
    };
  }
};
