
import { SNS } from "@aws-sdk/client-sns";
import { promisify } from 'util';

const sns = new SNS({})
const topicArn = process.env.sns; // change and fetch the value from actual sns topic

export const handler = async (event) => {

    let email;
    const subscribeAsync = promisify(sns.subscribe).bind(sns);
    console.log(process.env.sns);
    try {
        const request = JSON.parse(event.body);
        console.log(request);

        email = request.email;
        if (email === undefined || email === null || email.trim() === "") {
            console.log("Please provide a proper email value");
            return { statusCode: 422, body: JSON.stringify({error :"Please provide a proper email value"}) };
        }

    }
    catch (error) {
        console.error("error parsing JSON body:", error);
        return { statusCode: 422, body: JSON.stringify({error :"Please provide a proper email value"}) };
    }

    const subscribeParams = {
        Protocol: 'email',
        TopicArn: topicArn,
        Endpoint: email,
        Attributes: {
            'FilterPolicy': JSON.stringify({ "email": [email, "-1"] })  
        }
    };

    
    try {
        const data = await subscribeAsync(subscribeParams);
        console.log('User subscribed successfully:', data);
        return { statusCode: 200, body: JSON.stringify('User subscribed successfully') };
    } catch (error) {
        console.error('Error subscribing user:', error);
        return { statusCode: 500, body: JSON.stringify('Error subscribing user') };
    }
};