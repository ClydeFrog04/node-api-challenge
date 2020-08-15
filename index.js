const express = require("express");
const projectRouter = require("./data/projectRouter");
const actionRouter = require("./data/actionRouter");

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());


//routes
server.use("/api/project", projectRouter);
server.use("/api/action", actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Good news everyone!</h2>`);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
