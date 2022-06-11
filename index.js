require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db/db');
const models = require("./models/models");

const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(port, () => {
            console.log(`App listening at http://${host}:${port}`);
        });
    } catch (e) {
        console.error(e);
    }
}
start().then(r => console.log('Starting...'));


