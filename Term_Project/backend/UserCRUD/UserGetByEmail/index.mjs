import { DynamoDBClient, GetItemCommand} from "@aws-sdk/client-dynamodb";
import { promisify } from "util";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const sendAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "UserData";

export const handler = async (event) => {
  try {
    
    const email = event.pathParameters.email; // use either query parameter if get call or change to request body for post call

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Email is required to check for user",
        }),
      };
    }
    
    console.log(email);
    
    const params = {
      TableName: TABLE_NAME,
      Key: {
        email: { S : email},
      },
    };

    const getCommand = new GetItemCommand(params);
    const result = await sendAsync(getCommand);

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "No such email present in the database",
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          email: result.Item.email.S,
          password: result.Item.password.S,
        }),
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
