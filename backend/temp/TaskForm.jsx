import React, {useState} from "react";
import { TaskContext } from "../../frontend/src/contexts/TaskContext.jsx";
import { useContext } from "react";



export default function TaskForm() {
    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description, status: "InProgress", priority: "Medium" });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="max-w-md mx-auto mt-5">
            <h2 className="text-lg font-bold mb-3">Add Task</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded">
                <input
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Task
                </button>
            </form>
        </div>
    );
}