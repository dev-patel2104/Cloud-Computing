import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from 'util';

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const sendAsync = promisify(dynamoDB.send).bind(dynamoDB);

const TABLE_NAME = "UserData";

export const handler = async (event) => {
    try {

        let params;
        const req = JSON.parse(event.body);
        const email = req.email;
        const password = req.password;

        if (!email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Email and password are required in the request body" }),
            };
        }

        params = {
            TableName: TABLE_NAME,
            Key: {
                email: {S : email},
            },
        };

        const getCommand = new GetItemCommand(params);
        const existingUser = await sendAsync(getCommand);

        // remove this condition and update this code if we provide the functionality to edit the user
        if(existingUser.Item)
        {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "The DB already contains this email address",
                }),
            };
        }

        params = {
            TableName: TABLE_NAME,
            Item: {
                email: { S: email },
                password: {S: password},
            },
        };

        const putCommand = new PutItemCommand(params);

        await sendAsync(putCommand);     

        return {
            statusCode: 201, // 201 Created
            body: JSON.stringify({ email: email }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" }),
        };
    }
};