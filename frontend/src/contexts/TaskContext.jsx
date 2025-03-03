import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_API;

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-tasks`);
            if (response.status === 200) {
                setTasks(response.data.data); 
            } else {
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
            // setTasks([...tasks, response.data]);  
            setTasks(prevTasks => [...prevTasks, response.data]); // updates should be done in a functional way. Because React schedules state updates asynchronously, and using the previous state ensures correctness.
            fetchTasks(); // Refresh tasks after adding
            toast.success("Task added successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while adding task.");
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await axios.patch(`${API_URL}/update-task/${id}`, updatedTask);
            // setTasks(tasks.map(task => task.id === id ? updatedTask : task));
            setTasks(prevTasks => prevTasks.map(task => task._id === id ? updatedTask : task));
           
            toast.success("Task updated successfully");
            fetchTasks(); // not needed as we're already doing it in the updateTask function.
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while updating task.");
        }
    };
     

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/delete-task/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            // setForceRender(prev => prev + 1);
            toast.success("Task deleted successfully");
            fetchTasks(); // Refresh tasks after deletion
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while deleting the task");
        }
    };

    const filterTasks = (priority) => {
        if (priority !== "all") return tasks
        return tasks.filter(task => task.priority === priority);   
    }

    return (
        <TaskContext.Provider value={{ tasks,  addTask, updateTask, deleteTask, filterTasks, loading }}>
            {children}
        </TaskContext.Provider>
    );
}