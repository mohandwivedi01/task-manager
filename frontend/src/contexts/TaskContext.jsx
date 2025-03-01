import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_API;

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        console.log("Updated tasks:", tasks);  // This will log the correct updated tasks
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-tasks`);
            // get-all-tasks
            if (response.status === 200) {
                setTasks(response.data.data);  // ✅ Make sure to use 'response.data.data'
            } else {
                toast.error("Error fetching tasks");
            }
        } catch (error) {
            toast.error("Failed to fetch tasks 1");
        }
    };

    const addTask = async (task) => {
        console.log("Adding task");
        try {
            console.log("1");
            const response = await axios.post(`${API_URL}/add-task`, task);
            console.log("2");
            setTasks([...tasks, response.data]);
            console.log("3");
            toast.success("Task added successfully");
        } catch (error) {
            toast.error("Failed to add task", error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await axios.patch(`${API_URL}/update-task/${id}`, updatedTask);
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/delete-task/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
}