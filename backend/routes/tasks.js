import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";




const router = express.Router();


//creating a task
router.post("/", async (req,res) => {
    const task = new TaskModel(req.body);
    try {
        const response = await task.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

// Fetch tasks of a specific user
router.get("/:userId/tasks", async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const tasks = await TaskModel.find({ user: userId });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // Delete a user's task
  router.delete("/:taskId/tasks", async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
      const result = await TaskModel.deleteOne({ _id: taskId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });
  

  // Update a user's task
router.put("/:taskId/tasks", async (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
  
    try {
      const result = await TaskModel.findByIdAndUpdate(taskId, updatedTask, { new: true });
  
      if (!result) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  // Update a user's task to set isDone to true
router.put("/:taskId/tasks", async (req, res) => {
  const taskId = req.params.taskId;
  
  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.isDone = true; // Set isDone to true

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});


export {router as taskRouter};