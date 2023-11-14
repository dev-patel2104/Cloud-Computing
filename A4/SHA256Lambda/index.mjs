import crypto from "crypto";

export const handler = async (event) => {
    const { course_uri, action, value } = event;

    const hashedOutput = crypto.createHash("sha256").update(value).digest("hex");

    const endRequestBody = {
        banner: "B00934576",
        result: hashedOutput,
        arn: "arn:aws:lambda:us-east-1:579043522960:function:MD5Lambda",
        action: action,
        value: value,
    };

    const response = await fetch(course_uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(endRequestBody),
    });

    if (!response.ok) {
        throw new Error('Failed to send the post request');
    }

    return endRequestBody;
};
