import React, { useState } from "react";
import { FaAngleDoubleDown, FaAngleDown, FaFilter, FaSearch } from "react-icons/fa";
import Options from "./Options";
import { useId } from "react";

export default function Header(props) {
    const [option, setOption] = useState();
    // console.log(filter)
    return (
        <header>
            <div className="flex w-full justify-between items-center bg-[#ECEDEE] py-3 px-2 md:p-5 rounded-3xl shadow-md shadow-stone-400">
                <div className="flex">
                    <img className="w-[40px] rounded-full mr-1" src="../../public/logo.jpg"/>
                    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md shadow-stone-400 w-[284px]">
                        <FaSearch className="text-slate-500 lg:h-[20px] lg:w-[20px]" />
                        <input type="text" placeholder="Search Tasks" className="ml-2 focus:outline-none w-full bg-white" />
                    </div>
                </div>
                <div className=" flex text-slate-500 items-center bg-white px-1 lg:p-2 rounded-lg shadow-md shadow-stone-400 border border-slate-400">
                    <FaFilter className="text-sm" />

                    <Options
                        id={useId}
                        option={option}
                        setOption={setOption}
                        options={["Status", "Low", "Medium", "High"]}
                    />
                </div>
            </div>
        </header>
    )
}