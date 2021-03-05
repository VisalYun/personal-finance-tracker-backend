const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post("/finance", async (req, res) => {
    try{
        const { description, type, amount  } = req.body;
        const newActivity = await pool.query(`INSERT INTO finance (description, type, amount) VALUES('${description}', '${type}', ${amount}) RETURNING *`);
    
        res.json(newActivity.rows[0]);
    } catch(err){
        console.log(err.message);
    }
});

app.get("/finance", async(req, res) => {
    try {
        const allActivity = await pool.query("SELECT * FROM finance");

        res.json(allActivity.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/finance/total", async(req, res) => {
    try {
        const total = await pool.query("SELECT SUM (amount) AS total FROM finance");

        res.json(total.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/finance/expense", async(req, res) => {
    try {
        const total = await pool.query("SELECT SUM (amount) AS total FROM finance WHERE type = 'expense';");

        res.json(total.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/finance/income", async(req, res) => {
    try {
        const total = await pool.query("SELECT SUM (amount) AS total FROM finance WHERE type = 'income';");

        res.json(total.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(3000, () => {
    console.log("server has started on port 5000");
});