import React from "react";
import { FaCircle } from "react-icons/fa";
import TaskCard from "./TaskCard";

export default function TaskColumn(props){
    // const color = props.color;
    return(
        <div className="bg-[#ECEDEE] p-4 rounded-lg shadow-md shadow-stone-400 ">
            <h3 className={`font-bold text-lg mb-4 flex items-center justify-center`}>
              <FaCircle className={`text-[8px] text-${props.color}-600`} />
              <span className="mx-2 text-gray-600 text-md">{props.title}</span>
              <span className="bg-gray-300/60 text-gray-400 text-xs rounded-full px-1">{props.tasks.length}</span>
            </h3>
            <hr className={`my-2 border-2 border-${props.color}-600 text-${props.color}-600  sm:mx-auto lg:my-4`} />
            <div className="flex flex-col gap-4">
              {props.tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
         </div>
    )
}