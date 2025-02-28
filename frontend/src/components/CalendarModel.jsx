import React from "react";


export default function CalendarModal(props){
    // your modal code here
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-40">
        <div className="bg-white p-4 rounded-lg shadow-lg w-40">
            <h3 className="text-md font-semibold mb-2">Select a Date</h3> 
            <input
                type="date"
                className="p-1 border rounded"
                value={props.dueDate}
                onChange={(e) => props.setDueDate(e.target.value)}
            />
            <button
                className="w-full mt-3 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                onClick={(e) => {
                    e.preventDefault();
                    props.setCalader(false);
                }}
            >
                Close
            </button>
        </div>
        </div>
    );
}