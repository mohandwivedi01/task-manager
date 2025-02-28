import { createContext, useContext } from "react";

export const AddTaskContext = createContext({
    tasks: [
        { 
            id: 1, 
            title: "Task 1", 
            description: "Task 1 Description", 
            status: "Completed", 
            priority: "Low"
        }
    ],
    addTask: (task) => {},
    updateTask: (id, task) => {},
    deleteTask: (id) => {},
    handleAddTask: () => {},
    handleDeleteTask: () => {},
    handleEditTask: () => {},
    handleFilterTasks: () => {},
})  