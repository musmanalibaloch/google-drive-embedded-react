const express = require("express");
const app = express();
const { getDriveFiles } = require('./controllers/drive');

const cors = require('cors');
require('dotenv').config();
app.use(cors());

app.get('/drive/files', getDriveFiles);

app.listen(3001);
console.log('Listening on http://localhost:3001');