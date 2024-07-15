const express = require('express');
const app = express();
const port = 3000;
require('./db') // ---> doesnt return anyhting but connects the db to backend
const CRUD = require('./CRUD');

app.post('/criminals/load-data', async (req, res)=> {
    const loadData = await CRUD.loadData();
    res.json({"message": "Data Load Success!"});
})

app.get('/criminals/:name', async (req, res) => {
    const name = req.params.name;
    const criminal = await CRUD.findCriminalByName(name);
    res.json(criminal);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
