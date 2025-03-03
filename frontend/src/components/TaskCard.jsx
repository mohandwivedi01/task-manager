import React, { useState, useContext, useEffect, useRef } from "react";
import { FaEdit, FaEllipsisH, FaRegTrashAlt } from "react-icons/fa";
import { TaskContext } from "../contexts/TaskContext.jsx";
import AddTask from "./AddTask.jsx";
import { motion }  from "framer-motion"


export default function TaskCard({ task }) {
    const [isEdit, setIsEdit] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const dropdownRef = useRef(null);
    const { deleteTask } = useContext(TaskContext);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsEdit(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle task deletion
    const handleDelete = () => {
        console.log("Task deletion task._id")
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            deleteTask(task._id);
            setIsEdit(false); // Close dropdown after deleting
        }
    };


    return (
        <div className="bg-white rounded-xl shadow-md shadow-stone-400 p-4 relative animate-fadeInUp">
            <div className="flex justify-between items-center">
                {/* Priority Label */}
                <span className={`text-xs font-semibold px-2 py-1 rounded-md 
                    ${task?.priority === "High" ? "bg-red-100 text-red-600" :
                        task?.priority === "Low" ? "bg-yellow-100 text-yellow-600" :
                            "bg-green-100 text-green-600"}`}>
                    {task?.priority}
                </span>

                {/* Three Dots Menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="text-slate-600 p-1 rounded-full hover:text-slate-800 hover:bg-slate-100"
                    >
                        <FaEllipsisH />
                    </button>

                    {editTask && <AddTask
                        currTask={task}
                        setAddTask={setEditTask}
                    />}

                    {/* Dropdown Menu */}
                    {isEdit && (
                        <div className="absolute right-0 top-5 w-20 bg-gray-200 rounded-md shadow-md shadow-stone-400">
                            <button
                                onClick={() => setEditTask(true)}
                                className="flex items-center gap-2 px-2 py-2 text-blue-500 hover:bg-blue-200 rounded-t-md w-full text-sm"
                            >
                                <FaEdit />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-2 py-1 text-red-600 rounded-b-md hover:bg-red-200 w-full text-sm"
                            >
                                <FaRegTrashAlt />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Title & Description */}
            <h4 className="text-md font-semibold mt-2">{task?.title}</h4>
            {task?.description && <p className="text-gray-600 text-xs mt-1">{task?.description}</p>}

            {/* Task Deadline */}
            <p className="text-xs text-gray-500 mt-7">
                <strong>Deadline:</strong> {task?.dueDate}
            </p>
        </div>
    );
}
