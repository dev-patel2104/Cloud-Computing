const fs = require('fs');
const path = require('path');
const readline = require('readline');

exports.store = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.body);

        const fileName = body.file;
        if(fileName === undefined || fileName === null || fileName === "")
        {
            return res.status(500).json({file:null, error: "Invalid JSON input."});
        }

        const filePath = '/Dev_PV_dir/' + fileName;
        const data = body.data;
        
        fs.writeFile(filePath, data, (err) => {
            if(err)
            {
                console.error("Error writing to the file", err);
                return res.status(500).json({file: fileName, error: "Error while storing the file to the storage."});
            }

            console.log("file written successfully");
            res.status(200).json({ file : fileName, message: "Success."});
        });
    }
    catch (error) {
        return res.status(200).json({ error: "Some unexpected internal server error" });
    }
}

exports.getTemp = async (req,res) => {
    try
    {
        const body = req.body;
        const fileName = body.file;
      
        const name = body.name;

        if(fileName === undefined|| fileName === null || fileName.trim() === "")
        {
            return res.status(500).json({ file: null, error: "Invalid JSON input." });
        }
        // const filePath = './Dev_PV_dir/' + fileName;
        // if (!fs.existsSync(filePath)) {
        //     return res.status(200).json({ file : fileName, error: "File not found." });
        // }

        const postOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({file : fileName, name : name})
                }
                
                console.log("Sending to the second container");
    
                const response = await fetch(`http://app2-service.assignment.svc.cluster.local:3000/get-temp`, postOptions);
                const data = await response.json();
                return res.status(200).json(data);

    }
    catch(err)
    {
        return res.status(200).json({error: "Some unexpected internal server error"});
    }
}