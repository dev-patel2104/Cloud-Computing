import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const deleteItemAsync = promisify(dynamoDB.send).bind(dynamoDB);
const TABLE_NAME = "UserData";

export const handler = async (event) => {
    try {
      const email = event.pathParameters.email;
  
      if (!email) {
        return {
          statusCod: 400,
          body: JSON.stringify({ error: "email is required to know which user to delete" }),
        };
      }
  
      const params = {
        TableName: TABLE_NAME,
        Key: {
          email: { S : email},
        },
      };
      
      const deleteCommand = new DeleteItemCommand(params);
      const data = await deleteItemAsync(deleteCommand);
      console.log("User deleted successfully");
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully" }),
      };
    } catch (err) {
      console.error("Error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "An error occurred" }),
      };
    }
  };