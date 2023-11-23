import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import {promisify} from 'util';

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const deleteItemAsync = promisify(dynamoDB.send).bind(dynamoDB);
const TABLE_NAME = "GroceryData";


export const handler = async (event) => {
    try {
        const grocery_id = event.pathParameters.grocery_id; 

        if (!grocery_id) {
            return {
                statusCod: 400,
                body: JSON.stringify({ error: "grocery_id is required to know which item to delete" })
            };
        }

        const params = {
            TableName: TABLE_NAME,
            Key: {
                email: email,
                grocery_id: grocery_id,
            },
            ConditionExpression: `grocery_id = :conditionValue`,
            ExpressionAttributeValues: {
                ":conditionValue" : grocery_id,
            },
        }

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
