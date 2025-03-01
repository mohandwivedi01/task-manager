import React,{useContext} from "react";
import { FaCircle } from "react-icons/fa";
import TaskCard from "./TaskCard";
import { TaskContext } from "../contexts/TaskContext.jsx";

export default function TaskColumn({title, tasks}){
    
    return(
        <div className="bg-[#ECEDEE] p-4 rounded-lg shadow-md shadow-stone-400 ">
            <h3 className={`font-bold text-lg mb-4 flex items-center justify-center`}>
              <FaCircle className={`text-[8px] ${title === "Inprogress" ? "text-sky-500" : title === "Completed" ? "text-green-400" : "text-red-500"}`} />
              <span className="mx-2 text-gray-600 text-md">{title}</span>
              <span className="bg-gray-300/60 text-gray-400 text-xs rounded-full px-1">{tasks.length}</span>
            </h3>
            <hr className={`my-2 border-2 ${title === "Inprogress" ? "text-sky-500 border-sky-500" : title === "Completed" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}  sm:mx-auto lg:my-4 rounded-lg`} />
            <div className="flex flex-col gap-4">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task}/>
              ))}
            </div>
         </div>
    )
}