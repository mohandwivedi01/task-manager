import React from "react";

export default function SummaryCard(props) {
    return (
        <div className="bg-[#ECEDEE] p-4 rounded-lg items-center h-[190px] shadow-md shadow-stone-400">
            <div className="text-2xl rounded-full ">{props.icon}</div>
            <div className="">
                <h4 className="text-gray-500 text-sm my-4">{props.title}</h4>
                <p className="text-gray-900 text-3xl font-bold">{props.count}</p>
            </div>
        </div>
    )
}