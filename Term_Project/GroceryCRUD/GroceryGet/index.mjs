import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const queryAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "GroceryData";

export const handler = async (event) => {
  try {
    
    const email = event.queryStringParameters.email; 

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "email is required to get the grocery information for the user",
        }),
      };
    }

    const params = {
      TableName: TABLE_NAME, 
      KeyConditionExpression: "email = :uid", 
      ExpressionAttributeValues: {
        ":uid": email, 
      },
    };

    const result = await queryAsync(new QueryCommand(params));

    if (!result.Items || !result.Items.length === 0) {
      return {
        statusCode: 204,
        body: JSON.stringify({
          message:
            "No grocery item for the given email present in the database",
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