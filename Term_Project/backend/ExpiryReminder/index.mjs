import { SNS } from "@aws-sdk/client-sns";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { promisify } from 'util';

const sns = new SNS({});
const topicARN = 'arn:aws:sns:us-east-1:263032025301:DemoTopicSNS'; // change this value of topic arn from env
const dynamoDB = new DynamoDBClient({ region: "us-east-1" });

const scanAsync = promisify(dynamoDB.send).bind(dynamoDB);
const publishAsync = promisify(sns.publish).bind(sns);

const TABLE_NAME = "GroceryData";

export const handler = async (event) => {
    try {
        let response, params, message;
        params = {
            TableName: TABLE_NAME,
        };


        const result = await scanAsync(new ScanCommand(params));

        if (!result.Items || result.Items.length === 0) {
            return {
                statusCode: 204,
                body: JSON.stringify({
                    message: "No grocery items present in the database",
                }),
            };
        }

        const transformedItems = result.Items.map((item) => {
            const transformedItem = {};
            for (const [key, value] of Object.entries(item)) {
                transformedItem[key] = value[Object.keys(value)[0]];
            }
            return transformedItem;
        });


        let date;
        let currentTime, messageAttributes, cnt = 0;
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const groupedItems = {};
        for (const item of transformedItems) {

            currentTime = new Date();
            date = new Date(item.expiry_date);
            const timeDifference = date - currentTime;
            console.log("item Date:   " + timeDifference);
            if (timeDifference <= oneDayInMilliseconds && timeDifference >= 0) {

                const email = item.email;
                console.log(email);
                if (item.email in groupedItems) {
                    groupedItems[item.email].push(item);
                } else {
                    groupedItems[item.email] = [item];
                }


            }

        }

        for (const [email, items] of Object.entries(groupedItems)) {
            message = `You have the following items which are expiring in a day for ${email}:\n`;

            for (const item of items) {
                message += `${item.name}\n`;
            }

            const messageAttributes = { "email": { DataType: "String", StringValue: email } };

            const params = {
                Message: message,
                MessageAttributes: messageAttributes,
                TopicArn: topicARN,
                Subject: "Your grocery expiration reminder"
            };

            await publishAsync(params);
        }

        if (cnt == 0) {
            return {
                statusCode: 200,
                body: 'No change has been made to items and no user has been notified.'
            };
        }
        else {
            return {
                statusCode: 200,
                body: 'Message published to corresponding SNS topics.'
            };
        }

    }
    catch (err) {
        console.log("Some error has occurred", err);
        return {
            statusCode: 500,
            body: 'Error publishing message to SNS. Internal Server Error'
        };
    }

}