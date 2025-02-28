import React, { useState, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskContext } from "../../task-management/src/contexts/TaskContext.jsx";
import EditTask from "../../task-management/src/components/EditTask.jsx";

export default function TaskItem({ task }) {
    const { deleteTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-white shadow-md rounded p-3 mb-3 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setIsEditing(true)} className="text-blue-500">
                    <FaEdit />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    <FaTrash />
                </button>
            </div>

            {isEditing && <EditTask task={task} setIsEditing={setIsEditing} />}
        </div>
    );
}
