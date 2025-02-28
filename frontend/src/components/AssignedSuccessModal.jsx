import React from "react";
import { FaCheckCircle, FaCheckSquare } from "react-icons/fa";

export default function AssignedSuccessModal(props) {
    return ( 
        <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white p-6 rounded-3xl shadow-md shadow-stone-400 w-72 text-center">
            <FaCheckSquare className="w-20 h-20 text-black mx-auto" />
            <h3 className="text-md font-semibold mt-2 text-black">new task has been created successful</h3>
            <button
                className=" w-full mt-4 bg-black text-white px-4 py-2 rounded-lg "
                onClick={() => props.setShowAssignModal(false)}
            >
                Back
            </button>
        </div>
    </div>
    )
};