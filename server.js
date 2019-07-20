const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

const fileArr = [];
//joining path of directory
const directoryPath = path.join(__dirname, 'src/allFSes');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file, idx) {
        file = file.split('.')[0];
        fileArr.push(file);
    });
});

router.get('/', (req, res, next) => {
    res.send(fileArr);
})

const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Server started on port ${port}`));
