import blake2b from "blake2b";
import axios from "axios";

export const handler = async (event) => {
    const { course_uri, action, value } = event;

    let input = Buffer.from(value);
    const hashedOutput = blake2b(32).update(input).digest('hex');

    const endRequestBody = {
        banner: "B00934576",
        result: hashedOutput,
        arn: "arn:aws:lambda:us-east-1:579043522960:function:Blake2Lambda",
        action: action,
        value: value,
    };

    const response = await axios.post(`${course_uri}`, endRequestBody);

    return endRequestBody;
};
