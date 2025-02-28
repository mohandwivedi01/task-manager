import {Task} from "../models/tasks.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const healthCheck = (req, res) => {
    return res
   .status(200).
    json(
        new ApiResponse(200, "Server is running!", "Health check successful.")
    );
}

const createTask = asyncHandler(async (req, res) => {
    const {title, description, status, priority, dueDate} = req.body;
    const statusEnum = ["InProgress", "Completed", "Timeout"];
    const priorityEnum = ["Low", "High", "Medium"];
    if(!title){
        throw new ApiError(400, "Title is missing");
    }
    
    if(!priorityEnum.includes(priority.trim())){
        throw new ApiError(400, `Invalid priority: ${priority}`);
    }
    
    if(!statusEnum.includes(status.trim())){
        throw new ApiError(400, `Invalid status: ${status}`);
    }

    const task = await Task.create({
        title,
        description,
        priority,
        status,
        dueDate
    })

    if(!task){
        throw new ApiError(500, "Failed to create task");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, task, "Task created successfully!.")
    );
})

const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();

    if(!tasks){
        throw new ApiError(500, "Failed to get tasks");
    }

    return res
   .status(200)
   .json(
        new ApiResponse(200, tasks, "Tasks retrieved successfully!.")
    );
})

const getTaskById = asyncHandler(async (req, res) => {
    const {taskId} = req.params;

    if(!taskId) {
        throw new ApiError(400, "Task id is missing");
    }

    const task = await Task.findById(taskId);

    if(!task){
        throw new ApiError(404, "Task not found");
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, task, "Task fetched successfully!")
    );
})

const updateTask = asyncHandler(async (req, res) => {
    const {title, description, status, priority, dueDate} = req.body;
    const {taskId} = req.params;
    
    if(!taskId) {
        throw new ApiError(400, "Task id is missing");
    }

    const getTask =  await Task.findById(taskId);

    if(!getTask) {
        throw new ApiError(404, "Task not found this task id");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        taskId, 
        {
            $set: {
                title,
                description,
                status,
                priority,
                dueDate
            }
        },
        {new: true} 
    )

    if(!updatedTask) {
        throw new ApiError(500, "Unable to update task");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedTask, "Task updated successfully!")
    )
})

const deleteTask = asyncHandler(async (req, res) => {
    const {taskId} = req.params;

    if(!taskId) {
        throw new ApiError(400, "Task id is missing");
    }

    const getTaks = await Task.findById(taskId);

    if(!getTaks) {
        throw new ApiError(404, "Task not found");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if(!deletedTask) {
        throw new ApiError(500, "Unable to delete task");
    }

    return res
   .status(200)
   .json(
        new ApiResponse(200, deletedTask, "Task deleted successfully!")
   )
})


export {createTask, getAllTasks, getTaskById, updateTask, deleteTask, healthCheck}