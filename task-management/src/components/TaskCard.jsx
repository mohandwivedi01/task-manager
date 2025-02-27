import React from "react";

export default function TaskCard(props) {
    // console.log(props.task)
    return (
        <div className="bg-[#FFFF] rounded-xl shadow-md shadow-stone-400 border-l-4 border-gray-300 py-4 px-4">
            <div className="flex justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${props.task.priority === "High" ? "bg-red-100 text-red-600" : props.task.priority === "Low" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                    {props.task.priority}
                </span>
                <span className="font-bold mr-2"><button onClick={()=>{}}>...</button></span>
            </div>
            <h4 className="text-md font-semibold mt-2 ">{props.task.title}</h4>
            {props.task.description && <p className="text-gray-600 text-xs mt-1">{props.task.description}</p>}
            <p className="text-xs text-gray-500 mt-7">
                <strong>Deadline:</strong> {props.task.dueDate}
            </p>
        </div>
    )
}