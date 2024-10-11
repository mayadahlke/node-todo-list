const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const filePath = "todo.txt";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let tasks = [];

app.get("/", (req, res) => {
    let content = "";
    for (let task of tasks) {
        content += `- ${task}\n`;
    }
    console.log(content);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("File has been created");
        }
    });

    res.render("todo", { tasks: tasks });
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    tasks.push(task);

    res.redirect("/");
});

app.delete("/remove", (req, res) => {
    tasks = [];

    console.log(tasks);

    res.redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
