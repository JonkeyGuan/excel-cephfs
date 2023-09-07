const express = require('express');
const write = require("./write.js")
const read = require("./read.js")
const http = require('http');

const app = express();

const PORT = process.env.PORT || 8080;
const READ_SVC = process.env.READ_SVC || 'http://localhost:8080';

app.get('/write/:fileName/:repeat?/:read?', (req, res) => {
    let fileName = req.params.fileName;
    let read = req.params.read;
    let repeat = req.params.repeat;

    if (repeat == undefined) {
        repeat = 1
    }

    write.writeXsl(fileName, repeat);

    let text = "";
    if (read != undefined) {
        text = triggerRead(fileName, res);
    } else {
        res.status(200).send({
            success: 'true',
            message: 'xls wrte successfully',
            text: text,
        })
    }
});

app.get('/read/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    text = read.readXsl(fileName);

    res.status(200).send({
        success: 'true',
        message: 'xls read successfully',
        text: text,
    })
});

const triggerRead = (fileName, res) => {
    let text = "";
    console.log("trigger read: " + fileName);
    http.get(READ_SVC + '/read/' + fileName, (resp) => {
        resp.on('data', chunk => {
            text = text + chunk;
        });

        resp.on('end', () => {
            res.status(200).send({
                success: 'true',
                message: 'xls wrte/read successfully',
                text: text,
            })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(200).send({
            success: 'false',
            message: err.message,
        })
    });


};

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

