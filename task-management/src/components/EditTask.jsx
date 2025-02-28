import React, { useState } from "react";
import { FaCalendar, FaEllipsisV, FaUser } from "react-icons/fa";
import CalendarModal from "./CalendarModel";
import Options from "./Options";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function EditTask(props) {
    const [options, setOptions] = useState(false);
    const [calader, setCalader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        console.log("1 API URL: ", API_URL)
        e.preventDefault();
        console.log("task id: ", props.id)

        console.log("priority 2: ", props.priority);

        try {
            const updateTaskResponse = await axios.patch(`${API_URL}/update-task/${props.id}`,{
                title: props.title,
                description: props.description,
                dueDate: props.dueDate,
                priority: props.priority,
                status: props.status
            });
            if (updateTaskResponse.status === 200) {
                toast.success("Task updated successfully");
                setLoading(false);
                props.setEditTask(false);
            } else {
                setError("Failed to update task", updateTaskResponse.statusCode, updateTaskResponse);
                toast.error("Failed to update task", updateTaskResponse.statusCode, updateTaskResponse);
            }
        } catch (error) {
            console.error("Error: ", err, error)
            setError(err.message || "An error occurred while updating tasks.");
            setLoading(false);
        }
        
    }

    const handleOptions = (e) => {
        e.preventDefault();
        setOptions(!options);
    }
    const handleCalander = (e) => {
        console.log("handleCalander")
        e.preventDefault();
        setCalader(true);
    }


    return (
        <div className="fixed inset-0 flex  justify-center items-center py-10">
            <div className="bg-slate-200 max-w-xs, mx-auto mt-10 rounded-lg shadow-md border-2 border-slate-700 text-gray-900 py-5 px-7 ">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Edit TASK</h2>
                    <button onClick={() => props.setEditTask(false)} className="text-slate-800 hover:text-blue-900 text-md hover:bg-slate-300 px-2 rounded-full">x</button>
                </div>
                <form>
                    {/* Task Description */}
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <input className="w-full py-1 px-1 bg-slate-200 rounded-lg focus:outline-none text-slate-800 font-semibold"
                                placeholder="Title..."
                                onChange={(e) => props.setTitle(e.target.value)}
                                value={props.title}
                            />
                            <span className="text-sm taxt-gray-500 mt-3 ml-2">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setOptions(true)
                                }}><FaEllipsisV /></button>
                                {options && <Options
                                    status={props.status}
                                    setStatus={props.setStatus}
                                    priority={props.priority}
                                    setPriority={props.setPriority}
                                    handleOptions={handleOptions}
                                />}
                            </span>
                        </div>
                        <hr className="border border-gray-600 my-1" />
                        <textarea className="w-full h-[150px] p-1 bg-slate-200 rounded-lg focus:outline-none text-slate-800"
                            placeholder="Enter task..."
                            value={props.description}
                            onChange={(e) => props.setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between mt-6 text-gray-500 text-xs font-bold">
                        <button className="flex justify-center gap-1 hover:text-blue-500"
                            onClick={handleCalander}
                        ><FaCalendar className="text-gray-600 w-3 h-3" />{props.dueDate}</button>
                        {calader && <CalendarModal
                            dueDate={props.dueDate}
                            setDueDate={props.setDueDate}
                            setCalader={setCalader}
                        />}
                        <button className=" flex items-center gap-1  hover:text-blue-500" onClick={(e) => {handleSubmit(e)}} ><FaUser className="text-gray-600 h-3 w-3 mb-1" />Update Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}