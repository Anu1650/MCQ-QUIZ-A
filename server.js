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
app.use(express.json()); // For parsing JSON data
app.use(cors());

// ✅ Homepage Route
app.get("/", (req, res) => {
    console.log("✅ Homepage Loaded");
    res.render("Homepage.ejs");
});

app.get("/Homepage", (req, res) => {
    console.log("✅ Homepage Loaded");
    res.redirect("/");
});

// ✅ Index Routes
["index", "index2", "index3","index4","index5","index6","index7","index8"].forEach((route) => {
    app.get(`/${route}`, (req, res) => {
        console.log(`✅ ${route} page Loaded`);
        res.render(`${route}.ejs`);
    });
});

// ✅ Fetch Questions (with IDs) for Each Index
["questions", "questions2", "questions3","questions4","MangmentUnit3","MangmentUnit4","MangmentUnit5","MangmentAllQuestions"].forEach((fileName) => {
    app.get(`/${fileName}`, (req, res) => {
        const filePath = path.join(__dirname, `data/${fileName}.json`);

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(`❌ Error reading ${fileName}.json:`, err);
                return res.status(500).send("Error fetching questions");
            }

            const questions = JSON.parse(data).map((question, index) => ({
                ...question,
                id: index + 1 // Add unique ID for each question
            }));

            res.json(questions);
        });
    });
});

// ✅ Contact Page Route
app.get("/contact", (req, res) => {
    console.log("✅ Contact Page Loaded");
    res.render("contact.ejs");
});
app.use(express.json()); // Important: Ensure JSON body parsing is enabled

// ✅ Save Contact Message with ID
app.post("/submit-contact", (req, res) => {
    const { name, email, message } = req.body;

    fs.readFile("data/contactMessages.json", "utf8", (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }

        const newMessage = {
            id: messages.length + 1,  // ID starts from 1 to N
            name,
            email,
            message
        };

        messages.push(newMessage);

        fs.writeFile("data/contactMessages.json", JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error("❌ Error saving message:", err);
                return res.status(500).json({ error: "Failed to save message" });
            }
            res.status(200).json({ id: newMessage.id }); // Send back the new ID
        });
    });
});

// ✅ Get Messages for Display
app.get("/get-messages", (req, res) => {
    fs.readFile("data/contactMessages.json", "utf8", (err, data) => {
        if (err) {
            console.error("❌ Error reading messages:", err);
            return res.status(500).json([]);
        }
        res.json(JSON.parse(data));
    });
});

// ✅ Mainexam Page Route
app.get("/Mainexam", (req, res) => {
    console.log("✅ Mainexam Page Loaded");
    res.render("Mainexam.ejs");
});

// ✅ Fetch 70 Random Questions for Main Exam (with IDs)
app.get("/fetch-questions", (req, res) => {
    const quizName = req.query.quizName;
    const fileMap = {
        "Management": "questions.json",
        "Emerging Trends in Computer & IT": "questions2.json",
        "Environmental Studies": "questions3.json",
        "ETI Uity 2 Special": "questions4.json",
        "Mangment Unit 3": "MangmentUnit3.json",
        "Mangment Unit 4": "MangmentUnit4.json",
        "Mangment Unit 5":"MangmentUnit5.json",
        "Mangment IMP":"MangmentAllQuestions.json"
    };

    const fileName = fileMap[quizName];
    if (!fileName) return res.status(400).json({ error: "Invalid quiz selected" });

    const filePath = path.join(__dirname, "data", fileName);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(`❌ Error reading ${fileName}:`, err);
            return res.status(500).json({ error: "File read error" });
        }

        const questions = JSON.parse(data).map((question, index) => ({
            ...question,
            id: index + 1 // Assign unique ID for each question
        }));

        const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 70);
        res.json(randomQuestions);
    });
});

// ✅ Default Route - Redirect to Homepage
app.get("*", (req, res) => {
    console.log("✅ Homepage Loaded");
    res.redirect("/");
});

// ✅ Start the Server
app.listen(8080, () => {
    console.log("✅ Server running on port 8080");
});
