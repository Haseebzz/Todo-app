import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
})

export const TaskModel = mongoose.model("task", taskSchema)