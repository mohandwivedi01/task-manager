import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Low", "High", "Completed", "Timeout"],
        default: "Low",
    },
    dueDate: {
        type: String
    },

},{timestamps:true});

export const Task = mongoose.model("Task", taskSchema);