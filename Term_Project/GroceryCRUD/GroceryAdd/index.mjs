import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from 'util';
import { uuid } from 'uuidv4';

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const putItemAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "GroceryData";

export const handler = async (event) => {
  try {
    
    const req = JSON.parse(event.body);
    
    if(!req.name || !req.category || !req.expiry_date || !req.quantity || !req.status || !req.email)
    {
      return {
        statusCod: 400,
        body: JSON.stringify({error: "Not all the available data is present"})
      };
    }
    const name = req.name;
    const category = req.category;
    const quantity = req.quantity;
    const status = req.status;
    const date = req.expiry_date;    
    const email = req.email;
    
    const uuidValue = uuid();
    const params = {
      TableName: TABLE_NAME,
      Item: {
        email: {S: email},
        name: { S: name },
        grocery_id: { S: uuidValue },
        category: {S: category },
        quantity: {S: quantity},
        status: {S: status},
        expiry_date: {N: date.toString()}
      },
    };

    const putCommand = new PutItemCommand(params);

    await putItemAsync(putCommand);

    return {
      statusCode: 201, // 201 Created
      body: JSON.stringify({ message: "Grocery added successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred" }),
    };
  }
};