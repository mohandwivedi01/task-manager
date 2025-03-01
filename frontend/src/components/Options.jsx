import React from "react";

export default function Options(props) {
    return (

        <select id={`${props.id} || 101 `} className={`px-1 focus:outline-none text-sm ${props.className}`} value={props.option} onChange={(e) => props.setOption(e.target.value)}>
            {props.options.map(option => (
                <option key={option}>{option}</option>
            ))}
        </select>

    )
}