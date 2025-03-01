import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { FaSearch, FaFilter, FaExclamationTriangle, FaClipboardList, FaCheckCircle, FaAngleDown, } from "react-icons/fa"
// import AddTask from './components/AddTasks.jsx'

import SummaryCard from './components/SummaryCard.jsx'
import TaskColumn from './components/TaskColumn.jsx'
import Header from './components/Header.jsx'
import AddTask1 from './components/AddTask.jsx'
import { TaskContext } from './contexts/TaskContext.jsx'

const API_URL = import.meta.env.VITE_BACKEND_API;

function App() {
  const { tasks } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState();
  const [addTask, setAddTask] = useState(false);
  const [inProgressTasks, setInProgressTasks] = useState();
  const [timeoutTasks, setTimeoutTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);



  useEffect(() => {
    setInProgressTasks(tasks.filter((task) => task.status === "InProgress"));
    setTimeoutTasks(tasks.filter((task) => task.status === "Timeout"));
    setCompletedTasks(tasks.filter((task) => task.status === "Completed"));
    setLoading(false);

  }, [tasks]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        <h1 className='text-slate-800 text-2xl'>Loading...</h1>
      </div>
    )
  }
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        <h1 className='text-slate-800 text-2xl'>{error}</h1>
      </div>
    )
  }




  return (
    <>
      <div className="bg-white min-h-screen px-3 mt-6 md:px-5 md:mt-10 mb-16">
        {/* Search & Filter */}
        <Header />

        {/* Sidebar Summary */}
        <div className="flex mt-7 space-x-5 lg:space-x-12">

          <div className=" w-[200px] md:w-[322px] flex flex-col gap-4">
            <SummaryCard
              icon={<FaExclamationTriangle className="text-red-100 bg-red-500 h-12 w-12 p-3 rounded-full" />} title={"Expired Tasks"}
              count={timeoutTasks.length}
            />
            <SummaryCard
              icon={<FaClipboardList className="text-orange-100 bg-orange-500 h-12 w-12 p-3 rounded-full" />}
              title={"All Active Tasks"} count={inProgressTasks.length}
            />
            <SummaryCard
              icon={<FaCheckCircle className="text-blue-100 bg-blue-500 h-12 w-12 p-3 rounded-full" />} title={"Completed Tasks"} count={`${completedTasks.length}/${inProgressTasks.length}`}
            />
            <button onClick={() => setAddTask(true)} className="bg-black py-3 rounded-2xl shadow-md text-sm text-gray-200">+ Add Task</button>
          </div>

          {/* Modals */}
          {addTask && <AddTask1
            setAddTask={setAddTask}
          />}



          {/* Columns */}
          <div className="flex-grow grid md:grid-cols-3  gap-5 lg:gap-10 md:ml-6">

            <TaskColumn
              key={1}
              title={"Inprogress"}
              tasks={inProgressTasks}
            />
            <TaskColumn
              key={2}
              title={"Completed"}
              tasks={completedTasks}
            />
            <TaskColumn
              key={3}
              title={"Timeout"}
              tasks={timeoutTasks}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App









// import React from "react";
// import { TaskProvider } from "./contexts/TaskContext.jsx";
// import TaskForm from "./components/TaskForm.jsx";
// import TaskList from "./components/TaskList.jsx";

// function App() {
//   return (
//     <TaskProvider>
//       <div className="container mx-auto">
//         <h1 className="text-2xl font-bold text-center my-5">
//           Task Manager
//         </h1>
//         <TaskForm />
//         <TaskList />
//       </div>
//     </TaskProvider>
//   )
// }

// export default App;