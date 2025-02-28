import React from "react";

export default function Options(props) {
    console.log("status: ", props.status)
    console.log("priority  : ", props.priority)
    return (
        <div className="fixed inset-0 flex  justify-center items-center bg-opacity-40 ml-5">
            <div className="flex flex-col bg-white px-2 py-3  rounded-lg shadow-lg w-50 space-y-2">
                
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" onChange={(e) => props.setPriority(e.target.value)} value={props.priority}>
                    <option value="Priority">Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" onChange={(e) => props.setStatus(e.target.value)} value={props.status}>
                    <option value="Status">Status</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="Timeout">Timeout</option>
                </select>

                <button
                    className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 "
                    onClick={props.handleOptions}
                >
                    Select
                </button>
            </div>
        </div>
    );
}