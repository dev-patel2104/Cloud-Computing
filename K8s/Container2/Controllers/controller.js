const fs = require('fs');
const path = require('path');

exports.getTemp = async (req, res) => {
    try {
        const body = req.body;
        const fileName = body.file;
        const name = body.name;
 
        if(fileName === null || fileName.trim() === "" || fileName === undefined)
        {
            return res.status(500).json({ file: null, error: "Invalid JSON input." });
        }

        const filePath = './Dev_PV_dir/' + fileName;

        if (!fs.existsSync(filePath)) {
            return res.status(200).json({ file : fileName, error: "File not found." });
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');

        const lines = fileContents.split('\n');
        let nameIndex = -1;
        let tempIndex = -1;
        let tempVal;

        for (let i = 0; i < lines.length; i++) {
           
            const line = lines[i];
            const words = line.split(',');
            const updatedWords = words.map(str => str.trim())
            if (updatedWords.length < 4) {
                return res.status(500).json({ file: fileName, error: "Input file not in CSV format." });
            }
            if (i === 0) {
                nameIndex = updatedWords.indexOf("name");
                tempIndex = updatedWords.indexOf("temperature");
            }
            else {
                if (updatedWords[nameIndex] === name) {
                    tempVal = parseInt(updatedWords[tempIndex]);
                }
            }
        }
        console.log(tempVal);
        return res.status(200).json({ file: fileName, temperature: tempVal });
    }
    catch (error) {
        return res.status(500).json({ error: "Some unexpected internal server error" });
    }
}