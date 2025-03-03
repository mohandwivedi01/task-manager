import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_API;

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        let timedOut = false;

        const timeout = setTimeout(() => {
            timedOut = true;
            toast.info("The server was asleep. It will take about 1 minute to restart. Please wait...");    
        }, 10000);
        try {
            const response = await axios.get(`${API_URL}/get-all-tasks`);
            clearTimeout(timeout);
            if (response.status === 200) {
                setTasks(response.data.data); 
            } else {
                setError(response?.data?.message);
                toast.error("Error fetching tasks");
            } 
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while fetching tasks");
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axios.post(`${API_URL}/add-task`, task);
            if(task.status === "Status" || task.priority === "Priority"){
                toast.error("please choose task priority and status");
                return;
            }  
            setTasks(prevTasks => [...prevTasks, response.data]); // updates should be done in a functional way. Because React schedules state updates asynchronously, and using the previous state ensures correctness.
            fetchTasks(); // Refresh tasks after adding
            toast.success("Task added successfully");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong while adding task.");
            toast.error(error.response?.data?.message || "Something went wrong while adding task.");
        }
    };

    const updateTask = async (id, updatedTask) => {
        if(updatedTask.status === "Status"){
            toast.error("please choose task status");
            return;
        }
        if(updatedTask.priority === "Priority"){
            toast.error("please choose task priority");
            return;
        }
        try {
            const response = await axios.patch(`${API_URL}/update-task/${id}`, updatedTask);

            if (response.status === 200) {
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === id ? { ...task, ...updatedTask } : task // Merge old and updated task data
                    )
                );
                toast.success("Task updated successfully");
            } else {
                toast.error(response?.data?.message || "Failed to update task.");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong while updating task.");
        }
    };
     

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete-task/${id}`);
            if (response.status === 200) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== id)); // Correct field `_id`
                toast.success("Task deleted successfully");
            } else {
                toast.error(response?.data?.message || "Failed to delete task.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while deleting the task");
        }
    };

    const filterTasks = (priority) => {
        if (priority === "All") return tasks
        return tasks.filter(task => task.priority === priority);   
    }

    return (
        <TaskContext.Provider value={{ tasks,  addTask, updateTask, deleteTask, filterTasks, loading, error }}>
            {children}
        </TaskContext.Provider>
    );
}