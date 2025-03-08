const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const dotenv = require("dotenv");
const ejsMate = require("ejs-mate");
const path = require("path");

dotenv.config(); // Load .env file

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// ✅ Connect to PostgreSQL (Railway)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Railway
});

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL Database"))
    .catch((err) => console.error("❌ Database connection failed:", err));

// ✅ Homepage Route
app.get("/Homepage", (req, res) => {
    res.render("Homepage.ejs");
});

// ✅ Fetch Questions for Different Quizzes
app.get("/fetch-questions", async (req, res) => {
    const quizName = req.query.quizName;
    let tableName = "";

    if (quizName === "Management") tableName = "questions";
    else if (quizName === "Emerging Trends in Computer & IT") tableName = "questions2";
    else if (quizName === "Environmental Studies") tableName = "questions3";
    else return res.status(400).json({ error: "Invalid quiz selected" });

    try {
        const { rows } = await pool.query(`SELECT * FROM ${tableName} ORDER BY RANDOM() LIMIT 70`);
        res.json(rows);
    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
