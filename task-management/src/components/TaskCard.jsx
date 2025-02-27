import React, { useState } from "react";
import EditTask from "./EditTask";
import { FaAngleDown } from "react-icons/fa";

export default function TaskCard(props) {
    const [editTask, setEditTask] = useState(false);
    const [deleteTask, setDeleteTask] = useState()
    const [completeTask, setCompleteTask] = useState(false)
    const [option, setOption] = useState();
    

    return (
        <div className="bg-[#FFFF] rounded-xl shadow-md shadow-stone-400 border-l-4 border-gray-300 py-4 px-4">
            <div className="flex justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${props.task.priority === "High" ? "bg-red-100 text-red-600" : props.task.priority === "Low" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                    {props.task.priority}
                </span>
                <span className="font-semibold"><button onClick={() => { setEditTask(true) }}>
                    <select
                        className="block w-5 appearance-none bg-white  rounded-lg focus:outline-none px-1 cursor-pointer"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                    >
                        <option value="...">...</option>
                        <option value="Edit">Edit</option>
                        <option value="Delete">Delete</option>
                        <option value="Complete">Complete</option>
                    </select>
                    <FaAngleDown className="absolute right-3 top-2 text-gray-500 pointer-events-none" />

                </button></span>

            </div>
            <h4 className="text-md font-semibold mt-2 ">{props.task.title}</h4>
            {props.task.description && <p className="text-gray-600 text-xs mt-1">{props.task.description}</p>}
            <p className="text-xs text-gray-500 mt-7">
                <strong>Deadline:</strong> {props.task.dueDate}
            </p>
        </div>
    )
}