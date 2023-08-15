const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const bugsRouter = require('./routes/bugs');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
    res.json({
        name: "What's Bugging You? app",
        description: "."
    })
})

app.use("/bugs", bugsRouter);
app.use("/users", usersRouter);



module.exports = app;