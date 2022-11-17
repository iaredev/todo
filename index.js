const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use("/static" , express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const mongoose = require("mongoose");
// mongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
console.log("Connected");
app.listen(4000, () => console.log("Server Up"));
});

//models
const TodoTask = require("./models/TodoTask");

// GET
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
    });

//POST
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });