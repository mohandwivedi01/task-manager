import React from "react";

export default function EditTask(props) {
    return (
        <div className="fixed inset-0 flex  justify-center items-center bg-opacity-40 ml-5">
            <div className="flex flex-col bg-white px-2 py-3  rounded-lg shadow-lg w-50 space-y-2">
                <button>Complete</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
}