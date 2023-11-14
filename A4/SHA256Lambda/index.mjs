import crypto from "crypto";
import axios from "axios";

export const handler = async (event) => {
    const { course_uri, action, value } = event;

    const hashedOutput = crypto.createHash("sha256").update(value).digest("hex");

    const endRequestBody = {
        banner: "B00934576",
        result: hashedOutput,
        arn: "arn:aws:lambda:us-east-1:579043522960:function:SHA256Lambda",
        action: action,
        value: value,
    };

    const response = await axios.post(`${course_uri}`, endRequestBody);

    return endRequestBody;
};
