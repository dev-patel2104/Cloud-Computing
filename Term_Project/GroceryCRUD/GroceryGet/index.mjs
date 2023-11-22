import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const queryAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "GroceryData";

exports.handler = async (event) => {
  try {
    
    const user_id = event.queryStringParameters.user_id; 

    if (!user_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "user_id is required to get the grocery information for the user",
        }),
      };
    }

    const params = {
      TableName: TABLE_NAME, 
      KeyConditionExpression: "user_id = :uid", 
      ExpressionAttributeValues: {
        ":uid": user_id, 
      },
    };

    const result = await queryAsync(new QueryCommand(params));

    if (!result.Items || !result.Items.length === 0) {
      return {
        statusCode: 204,
        body: JSON.stringify({
          message:
            "No grocery item for the given user_id present in the database",
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred" }),
    };
  }
};