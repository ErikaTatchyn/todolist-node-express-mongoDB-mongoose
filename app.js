const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/taskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
  name: "Buy groceries",
});

task1.save();

Task.find()
  .then(function (tasks) {
    console.log(tasks);
  })
  .catch(function (error) {
    console.log(error);
  });

Task.updateOne({ _id: "648f0bc73e6a7dc8334462ec" }, { name: "walk" })
  .then(function (result) {
    console.log("Task updated successfully.");
  })
  .catch(function (error) {
    console.log(error);
  });

Task.deleteOne({ _id: "648f0bd63b455fdb0afe712f" })
  .then(function (result) {
    console.log("Task deleted successfully.");
  })
  .catch(function (error) {
    console.log(error);
  });
