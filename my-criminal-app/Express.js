const express = require('express');
const app = express();
const port = 3000;

app.get('/criminals/:name', async (req, res) => {
    const name = req.params.name;
    const criminal = await findCriminalByName(db, name);
    res.json(criminal);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
