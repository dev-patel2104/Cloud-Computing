import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import {promisify} from 'util';

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const deleteItemAsync = promisify(dynamoDB.send).bind(dynamoDB);
const TABLE_NAME = "GroceryData";


export const handler = async (event) => {
    try {
        const grocery_id = event.pathParameters.grocery_id; 
        const email = event.queryStringParameters.email;

        if (!grocery_id || !email) {
            return {
                statusCod: 400,
                body: JSON.stringify({ error: "Provide all the necessary input fields is required to know which item to delete" })
            };
        }

        const params = {
            TableName: TABLE_NAME,
            Key: {
                email: { S: email },
                grocery_id: { S: grocery_id },
            },
            
        }
        
        console.log(params);
        const data = await deleteItemAsync(new DeleteItemCommand(params));
        console.log("Item delete successfully");

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Item deleted successfully"}),
        };
    }
    catch (err) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" }),
        };
    }
}