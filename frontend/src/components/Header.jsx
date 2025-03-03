import React, { useState, useContext } from "react";
import {FaFilter, FaSearch } from "react-icons/fa";
import Options from "./Options";
import { useId } from "react";
import { TaskContext } from "../contexts/TaskContext.jsx";

export default function Header(props) {
    const [option, setOption] = useState("All");
    const { filterTasks } = useContext(TaskContext);
    console.log("filter option: ",option)
    if(option !== "All"){
        // filterTasks(option)
    }
    
    
    return (
        <header>
            <div className="flex w-full justify-between items-center bg-[#ECEDEE] py-3 px-2 md:p-5 rounded-3xl shadow-md shadow-stone-400 ">
                <div className="flex animate-fadeInUp">
                    <img className="w-[40px] rounded-full mr-1" src="../../public/logo.jpg"/>
                    <div className="flex items-center bg-white rounded-full md:px-4 px-3 py-2 shadow-md shadow-stone-400 md::w-[284px]">
                        <FaSearch className="text-slate-500 lg:h-[20px] lg:w-[20px]" />
                        <input type="text" placeholder="Search Tasks" className="ml-2 focus:outline-none w-full bg-white" />
                    </div>
                </div>
                <div className=" flex max-w-[90px] md:max-w-[500px] text-slate-500 items-center bg-white p-1 lg:px-2 rounded-lg shadow-md shadow-stone-400 border border-slate-400 animate-fadeInUp">
                    <FaFilter className="text-sm" />

                    <Options
                        id={useId}
                        option={option}
                        setOption={setOption}
                        options={["All", "Low", "Medium", "High"]}
                    />
                </div>
            </div>
        </header>
    )
}