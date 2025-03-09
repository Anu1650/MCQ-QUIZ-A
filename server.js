const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

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
    fs.readFile("data/questions.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// ✅ Fetch Questions for Index2
app.get("/questions2", (req, res) => {
    fs.readFile("data/questions2.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// ✅ Fetch Questions for Index3
app.get("/questions3", (req, res) => {
    fs.readFile("data/questions3.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error fetching questions");
        } else {
            res.json(JSON.parse(data));
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
    let fileName = "";

    if (quizName === "Management") {
        fileName = "questions.json";
    } else if (quizName === "Emerging Trends in Computer & IT") {
        fileName = "questions2.json";
    } else if (quizName === "Environmental Studies") {
        fileName = "questions3.json";
    } else {
        return res.status(400).json({ error: "Invalid quiz selected" });
    }

    fs.readFile(`data/${fileName}`, "utf8", (err, data) => {
        if (err) {
            console.error("❌ Error reading file:", err);
            res.status(500).json({ error: "File read error" });
        } else {
            const questions = JSON.parse(data);
            const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 70);
            res.json(randomQuestions);
        }
    });
});

// ✅ Start the Server
app.listen(8080, () => {
    console.log("✅ Server running on port 8080");
});