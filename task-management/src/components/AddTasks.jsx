import { useState } from "react";
import { FaCalendar, FaUser, FaCheckCircle, FaXing, FaTheRedYeti, FaOptinMonster, FaGripVertical, FaEllipsisV } from "react-icons/fa";

export default function AddTask(props) {

    return (
        <div className="fixed inset-0 flex justify-center items-center py-10">
            <div className=" bg-slate-200 max-w-xs mx-auto mt-10 rounded-lg shadow-md border-2 border-slate-700 text-gray-900 py-5 px-7 ">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">ADD TASK</h2>
                    <button className="text-blue-500 text-xl">+</button>
                </div>

                {/* Task Description */}
                <div className="mt-4">
                    <div className="flex justify-between">
                        <h3 className="text-md font-bold">TASK 1</h3>
                        <span className="text-sm text-gray-500"><FaEllipsisV /></span>
                    </div>
                    <hr className="border-2 border-gray-600" />
                    <p className="text-grya-600 text-sm mt-2">
                        Lorem ipsum dolor sit amet consectetur. Ut diam tellus nunc sed amet mauris molestie.
                        Lorem ipsum dolor sit amet consectetur. Ut diam tellus nunc sed amet mauris molestie.
                        Lorem ipsum dolor sit amet consectetur. Ut diam tellus nunc sed amet mauris molestie.
                        Lorem ipsum dolor sit amet consectetur. Ut diam tellus nunc sed amet mauris molestie.
                        Lorem ipsum dolor sit amet consectetur. Ut diam tellus nunc sed amet mauris molestie.
                    </p>
                </div>
                <div className="flex justify-between mt-6 text-gray-500 text-xs font-bold">
                    <button className="flex justify-center gap-1 hover:text-blue-500" onClick={props.handleCalendarToggle} ><FaCalendar className=" text-gray-600 w-3 h-3 " />{props.selectedDate}</button>
                    <button className=" flex items-center gap-1  hover:text-blue-500" onClick={props.handleAssignToggle} ><FaUser className="text-gray-600 h-3 w-3 mb-1" />Assigned to</button>
                </div>
            </div>
        </div>
        
    )
};

