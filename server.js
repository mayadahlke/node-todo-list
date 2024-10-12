const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const filePath = "todo.txt";

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let tasks = [];

// Load tasks from file on startup
loadFile = async () => {
    if (fs.existsSync(filePath)) {
        try {
            const data = await fs.promises.readFile(filePath, "utf8");
            console.log("Tasks file content:", data.toString());
            //TODO: Parse the data and set the tasks array
        } catch (error) {
            console.error("Error reading tasks file:", error);
        }
    } else {
        console.log("Tasks file does not exist.");
    }
};
loadFile();

app.get("/", async (req, res) => {
    let content = "";
    for (let task of tasks) {
        content += `- ${task.text} (${task.id})\n`;
    }

    try {
        await fs.promises.writeFile(filePath, content);
        res.render("todo", { tasks: tasks });
    } catch (error) {
        console.error("Error writing tasks file:", error);
    }
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    tasks.push({ text: task, id: Date.now() });

    res.redirect("/");
});

app.post("/remove", (req, res) => {
    const tasksToRemove = req.body.tasksToRemove;
    tasks = tasks.filter((task) => !tasksToRemove.includes(task.id.toString()));

    res.redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
