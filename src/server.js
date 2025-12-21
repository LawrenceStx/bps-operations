const express = require('express');
const cors = require('cors');
const { db, initDB } = require('./database');

const app = express();
const PORT = process.env.port || 3000;

// Middlewares
app.use(express.json());
app.use(express.static('../public'));
app.use(cors());

initDB();

app.get('/', (req, res) => {
    res.status(200).json({success:true,data:"Welcome to BPS Operations Management System."})
})

app.listen(PORT, () => {
    console.log(`The port is listening at http://localhost:${PORT}`);
})