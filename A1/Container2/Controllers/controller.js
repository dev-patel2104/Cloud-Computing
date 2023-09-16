const fs = require('fs');
const path = require('path');
const readline = require('readline');

exports.validate = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.body);
        if (body.file == null || body.file.trim() === '') {
            return res.status(200).json({ file: null, error: "Invalid JSON input" });
        }

        const fileName = body.file;
        const filePath = '/app/data/' + fileName;
        if (!fs.existsSync(filePath)) {
            return res.status(200).json({ error: "file not found" });
        }


        const fileContents = fs.readFileSync(filePath, 'utf8');

        const lines = fileContents.split('\r\n');
        let nameIndex = -1;
        let tempIndex = -1;
        let tempVal;

        for (let i = 0; i < lines.length; i++) {
           
            const line = lines[i];
            const words = line.split(',');
            if (words.length < 4) {
                return res.status(200).json({ file: fileName, error: "Input file not in CSV format" });
            }
            if (i === 0) {
                nameIndex = words.indexOf("name");
                tempIndex = words.indexOf("temperature");
            }
            else {
                if (words[nameIndex] === body.name) {
                    tempVal = parseInt(words[tempIndex]);
                }
            }
        }
        console.log(tempVal);
        return res.status(200).json({ file: fileName, temperature: tempVal });
    }
    catch (error) {
        return res.status(200).json({ error: "Some unexpected internal server error" });
    }
}