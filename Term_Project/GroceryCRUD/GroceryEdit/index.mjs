import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {promisify} from 'util';

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const updateItemAsync = promisify(dynamoDB.send).bind(dynamoDB);
const TABLE_NAME = "GroceryData";


exports.handler = async (event) => {
    try {
        const req = JSON.parse(event.body);

        if (!req.name || !req.category || !req.expiry_date || !req.quantity || req.status || !req.user_id
            || !req.grocery_id) {
            return {
                statusCod: 400,
                body: JSON.stringify({ error: "Not all the available data is present" })
            };
        }

        const name = req.name;
        const category = req.category;
        const quantity = req.quantity;
        const status = req.status;
        const date = req.expiry_date;
        const user_id = req.user_id;
        const grocery_id = req.grocery_id;

        const params = {
            TableName: TABLE_NAME,
            Key: {
                user_id: user_id,
                grocery_id : grocery_id,
            },
            UpdateExpression: `SET name = :newName, category = :newCategory, quantity = :newQuantity, status = :newStatus, expiry_date = :newExpiryDate`,
            ConditionExpression: `grocery_id = :conditionValue`,
            ExpressionAttributeValues: {
                ":newName" : name,
                ":newCategory" : category,
                ":newQuantity" : quantity,
                ":newStatus" : status,
                ":newExpiryDate" : date,
                ":conditionValue" : grocery_id,
            },
            ReturnValues: "ALL_NEW",
        }

        const data = await updateItemAsync(new UpdateItemCommand(params));
        console.log("Item updated successfully:", data);
        return{
            statusCode: 200,
            body: JSON.stringify({message: "Item updated succesfully"}),
        }
    }
    catch (err) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" }),
        };
    }
}
