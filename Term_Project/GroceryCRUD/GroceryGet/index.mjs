import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const scanAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "GroceryData";

export const handler = async (event) => {
  try {
    const email = event.pathParameters.email;

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
      FilterExpression: "email = :uid", // Use FilterExpression instead of KeyConditionExpression for ScanCommand
      ExpressionAttributeValues: {
        ":uid": { S: email },
      },
    };

    const result = await scanAsync(new ScanCommand(params));

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 204,
        body: JSON.stringify({
          message: "No grocery item for the given email present in the database",
        }),
      };
    } else {
      // Transform items to remove type annotations
      const transformedItems = result.Items.map(item => {
        const transformedItem = {};
        for (const [key, value] of Object.entries(item)) {
          transformedItem[key] = value[Object.keys(value)[0]];
        }
        return transformedItem;
      });

      return {
        statusCode: 200,
        body: JSON.stringify(transformedItems),
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
