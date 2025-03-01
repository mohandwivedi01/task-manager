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
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    status: {
        type: String,
        enum: ["Inprogress", "Completed", "Timeout"],
        default: "Inprogress",
    },
    dueDate: {
        type: String
    },

},{timestamps:true});

export const Task = mongoose.model("Task", taskSchema);