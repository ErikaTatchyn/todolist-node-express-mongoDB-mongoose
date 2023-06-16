const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");
}
const app = express();
const date = require(__dirname + "/day");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const taskSchema = new mongoose.schema({ name: String });
const Task = mongoose.model("Tasks", taskSchema);
const task = new Task({ name: "walk" });
task.save();

// const today = new Date();
// const day = "";
// const personalListItems = [];
// const workListItems = [];
// const options = {
//   weekday: "long",
//   day: "numeric",
//   month: "long",
// };

// day = today.toLocaleDateString("en-US", options);

// app.get("/", function (req, res) {
//   res.render("list", { listTitle: day, newListItem: personalListItems });
// });

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItem: workListItems });
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

// app.post("/", function (req, res) {
//   item = req.body.newItem;
//   buttonType = req.body.button;
//   if (item === "") {
//     console.log("Error: New list item is blank");
//   } else if (buttonType === "Work") {
//     workListItems.push(item);
//     res.redirect("/work");
//   } else {
//     personalListItems.push(item);
//     res.redirect("/");
//   }
// });

// app.listen(3000, function () {
//   console.log("Server started on port 3000.");
// });
