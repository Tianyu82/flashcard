// server.js

const express = require('express');
const path = require('path');
const cors = require("cors");
const pool = require("./db")

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000; // Use the port specified in environment variables or default to 5000

//API routes or other server logic can be added here

//Create a category
app.post("/category", async(req, res)=>{
    try {
        const {category_name} = req.body;
        const newCategory = await pool.query("INSERT INTO category (category_name) VALUES ($1) RETURNING *", [category_name]);
        res.json(newCategory.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all categories
app.get("/category", async(req, res)=>{
    try {
        const allCategories = await pool.query("SELECT * FROM category");
        res.json(allCategories.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//create a question
app.post("/question", async(req, res)=>{
    try {
        const {category_name, owner_name, question, option1, option2, answer} = req.body;
        const newQuestion = await pool.query(
        `INSERT INTO flashcard (category_name, owner_name, question, option1, option2, answer) 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [category_name, owner_name, question, option1, option2, answer]);
        res.json(newQuestion.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all questions under a specific category
app.get("/question/:category", async(req, res)=>{
    try {
        const {category} = req.params;
        const questions = await pool.query("SELECT * FROM flashcard WHERE category_name = $1", [category]);
        res.json(questions.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});