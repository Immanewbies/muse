const express = require('express')
const app = express()

// app.get("/api", (req, res) => {
//     res.json({"yo": ["hi"]})
// })
const querySql = async (req, res) => {

};

app.get("/query", querySql);

app.listen(5000, () => { console.log("Server Start on Server Port 5000 at http://localhost:5000") })