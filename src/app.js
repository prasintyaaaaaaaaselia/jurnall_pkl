const express = require("express");
const bodyParser = require("body-parser");
const migration = require('./models/migration')
const routes = require('./routes/routes')
const cors=require('cors')

const app = express();
const port = 3000;

app.use (cors())
app.use(bodyParser.json());
app.use("/api", routes)
migration();

app.listen(port, () =>{
    console.log(`jalan diport ${port}`)
});

