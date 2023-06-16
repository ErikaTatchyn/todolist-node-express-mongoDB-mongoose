const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model("Tasks", taskSchema);

app.set("view engine", "ejs");

app.get("/", async function (req, res) {
  try {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const day = today.toLocaleDateString("en-US", options);

    const tasks = await Task.find({}, "name").exec();
    res.render("list", { listTitle: day, newListItem: tasks });
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async function (req, res) {
  try {
    const taskName = req.body.newItem;
    const task = new Task({ name: taskName, completed: false });
    await task.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/tasks/:id", async function (req, res) {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndRemove(taskId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
