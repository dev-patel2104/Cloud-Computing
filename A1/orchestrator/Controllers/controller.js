const fs = require('fs');
const path = require('path');
const readline = require('readline');

exports.validate = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.body);
        if (body.key === "temperature") {
            //console.log("Sending to the second container");
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({file : body.file, name : body.name, key: body.key})
            }
            
            console.log("Sending to the second container");

            const response = await fetch(`http://app2:3000/user-info`, postOptions);
            const data = await response.json();
            return res.status(200).json(data);

        }
        if (body.file == null || body.file.trim() === '') {
            return res.status(200).json({ file: null, error: "Invalid JSON input." });
        }

        const fileName = body.file;
        const filePath = '/app/data/' + fileName;
        if (!fs.existsSync(filePath)) {
            return res.status(200).json({ file : fileName, error: "File not found." });
        }


        const fileContents = fs.readFileSync(filePath, 'utf8');

        const lines = fileContents.split('\r\n');
        let nameIndex = -1;
        let latIndex = -1;
        let longIndex = -1;
        let longVal;
        let latVal;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const words = line.split(',');
            if (words.length < 4) {
                return res.status(200).json({ file: fileName, error: "Input file not in CSV format." });
            }
            if (i === 0) {

                nameIndex = words.indexOf("name");
                latIndex = words.indexOf("latitude");
                longIndex = words.indexOf("longitude");
            }
            else {
                if (words[nameIndex] === body.name) {
                    latVal = parseFloat(words[latIndex]);
                    longVal = parseFloat(words[longIndex]);
                }
            }
        }
        return res.status(200).json({ file: fileName, latitude: latVal, longitude: longVal });


    }
    catch (error) {
        return res.status(200).json({ error: "Some unexpected internal server error" });
    }
}