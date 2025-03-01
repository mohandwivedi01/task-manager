import React, { useState } from "react";
import Options1 from "./Options.jsx";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext.jsx";
import { toast } from "react-toastify";

export default function AddTask({ setAddTask }) {
    // State to store task details
    const { addTask } = useContext(TaskContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    // Handle select dropdown changes
    const handleOptionChange = (name, value) => {
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Task Submitted:", task);
        if (!task?.title) {
            toast.error("Please enter a title");
            return;
        }
        if (!task?.status || !task?.priority) {
            toast.error("Please select a status and priority")
            return;
        }

        addTask(task)
        setTask({
            title: "",
            description: "",
            status: "Status",
            priority: "Priority",
            dueDate: "",
        })
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-10">
            <div className="bg-gray-200 max-w-xs mx-auto mt-10 rounded-lg shadow-md border border-slate-400 text-gray-900 py-5 px-7">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">ADD TASK</h2>
                    <button
                        onClick={() => setAddTask(false)}
                        className="text-slate-800 hover:text-gray-950 text-md hover:bg-gray-300 px-2 rounded-full"
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <input
                            className="w-full px-2 bg-gray-200 rounded-lg focus:outline-none text-slate-900 font-semibold text-md"
                            placeholder="Title..."
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                        />
                        <hr className="border border-gray-600 my-1" />
                        <textarea
                            className="w-full h-[150px] py-1 px-2 bg-gray-200 rounded-lg focus:outline-none text-slate-800 text-sm"
                            placeholder="Enter task..."
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        />
                        <div className="flex justify-between mt-2">
                            <Options1
                                className="rounded-lg bg-gray-50 shadow-md shadow-stone-400"
                                option={task.status}
                                setOption={(value) => handleOptionChange("status", value)}
                                options={["Status", "Inprogress", "Completed", "Timeout"]}
                            />
                            <Options1
                                className=" rounded-lg bg-gray-50 shadow-md shadow-stone-400"
                                option={task.priority}
                                setOption={(value) => handleOptionChange("priority", value)}
                                options={["Priority", "Low", "Medium", "High"]}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <input
                                className="px-1 border rounded-lg focus:outline-none bg-gray-50 text-xs shadow-md shadow-stone-400"
                                type="date"
                                name="dueDate"
                                value={task.dueDate}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="text-white bg-green-400 hover:bg-green-500 px-3 py-1 rounded-lg text-sm shadow-md shadow-stone-400"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
