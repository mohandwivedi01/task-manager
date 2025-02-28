import { createContext, useContext } from "react";

// Define the context
export const EditTaskContext = createContext({
    addTask: [
        { 
            id: 1, 
            title: "Task 1", 
            description: "Task 1 Description", 
            status: "Completed", 
            priority: "Low"
        }
    ],
    editTask: null,
    setEditTask: () => {},

})