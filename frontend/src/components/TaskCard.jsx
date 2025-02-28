import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function TaskCard(props) {
    const [editTask, setEditTask] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [dueDate, setDueDate] = useState("Select Deadline");
    const [status, setStatus] = useState();
    const [priority, setPriority] = useState();

    useEffect(() => {
        setTitle(props.task.title);
        setDescription(props.task.description);
        setDueDate(props.task.dueDate);
        setStatus(props.task.status);
        setPriority(props.task.priority);
    }, [])

    const handleDelete = async (task) => {
        toast.info("deleting..")
        if (!task || !task._id) {
            console.error("Invalid task data");
            return;
        }
        try {
            const response = await axios.delete(`${API_URL}/delete-task/${task._id}`);
            if (response.status === 200) {
                toast.success("Task deleted successfully!"); // Assuming setTasks updates the UI
            } else {
                throw new Error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(error.response?.data?.message || "Failed to delete task.");
        }
    };

    return (
        <div className="bg-[#FFFF] rounded-xl shadow-md shadow-stone-400 border-l-4 border-gray-300 py-4 px-4">
            <div className="flex justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${props.task.priority === "High" ? "bg-red-100 text-red-600" : props.task.priority === "Low" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                    {props.task.priority}
                </span>
                <span className="text-sm space-x-2 ">
                    <button onClick={()=>setEditTask(true)}><FaEdit className="text-indigo-600" /></button>
                    <button onClick={() => handleDelete(props.task)}><FaRegTrashAlt className="text-red-600" /></button>
                </span>
            </div>
            {editTask && <EditTask
                id={props.task._id}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
                priority={priority}
                setPriority={setPriority}
                status={status}
                setStatus={setStatus}
                setEditTask={setEditTask}                
            />}
            <h4 className="text-md font-semibold mt-2 ">{props.task.title}</h4>
            {props.task.description && <p className="text-gray-600 text-xs mt-1">{props.task.description}</p>}
            <p className="text-xs text-gray-500 mt-7">
                <strong>Deadline:</strong> {props.task.dueDate}
            </p>
        </div>
    )
}