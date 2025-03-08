const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// ✅ Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aniket@2006",
    database: "mcq_db",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to database");
});

// ✅ Homepage Route
app.get("/Homepage", (req, res) => {
    console.log("✅ Homepage Loaded");
    res.render("Homepage.ejs");
});

// ✅ index Route
app.get("/index", (req, res) => {
    console.log("✅ index page Loaded");
    res.render("index.ejs");
});

// ✅ index2 Route
app.get("/index2", (req, res) => {
    console.log("✅ index2 page Loaded");
    res.render("index2.ejs");
});

// ✅ index3 Route
app.get("/index3", (req, res) => {
    console.log("✅ index3 page Loaded");
    res.render("index3.ejs");
});

// ✅ Fetch Questions for Index
app.get("/questions", (req, res) => {
    db.query("SELECT * FROM questions", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(results);
        }
    });
});

// ✅ Fetch Questions for Index2
app.get("/questions2", (req, res) => {
    db.query("SELECT * FROM questions2", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(results);
        }
    });
});

// ✅ Fetch Questions for Index3
app.get("/questions3", (req, res) => {
    db.query("SELECT * FROM questions3", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(results);
        }
    });
});
// ✅ Contact Page Route
app.get("/contact", (req, res) => {
    console.log("✅ Contact Page Loaded");
    res.render("contact.ejs");
});

// ✅ Mainexam Page Route
app.get("/Mainexam", (req, res) => {
    console.log("✅ Mainexam Page Loaded");
    res.render("Mainexam.ejs");
});

// ✅ Fetch 70 Random Questions for Main Exam
app.get("/fetch-questions", (req, res) => {
    const quizName = req.query.quizName;
    let tableName = "";

    if (quizName === "Management") {
        tableName = "questions";
    } else if (quizName === "Emerging Trends in Computer & IT") {
        tableName = "questions2";
    } else if (quizName === "Environmental Studies") {
        tableName = "questions3";
    } else {
        return res.status(400).json({ error: "Invalid quiz selected" });
    }

    db.query(`SELECT * FROM ${tableName} ORDER BY RAND() LIMIT 70`, (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// ✅ Start the Server
app.listen(8080, () => {
    console.log("✅ Server running on port 8080");
});
