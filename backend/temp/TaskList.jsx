import React from "react";
import { TaskContext } from "../../task-management/src/contexts/TaskContext.jsx";
import { useContext } from "react";
import TaskItem from "./TaskItem.jsx";

export default function TaskList() {
    const { tasks } = useContext(TaskContext);

    return (
        <div className="max-w-md mx-auto mt-5">
            <h2 className="text-lg font-bold mb-3">Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                tasks.map((task) => <TaskItem key={task.id} task={task} />)
            )}
        </div>
    );
}