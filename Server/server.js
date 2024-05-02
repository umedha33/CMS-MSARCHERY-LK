const port = process.env.PORT || 4000;
const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { chats } = require('./data/data');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.send('API is running!')
})

app.get('/api/chat', (req, res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
    // console.log(req.params.id)
    // res.send(req.params.id)
    const singleChat = chats.find(c => c._id === req.params.id)
    res.send(singleChat)
})

app.listen(port, console.log(`Server Started on PORT ${port}`));