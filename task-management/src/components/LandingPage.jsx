import React, {useState} from "react";
import { FaSearch, FaFilter, FaExclamationTriangle, FaClipboardList, FaCheckCircle, FaAngleDown, FaCircle } from "react-icons/fa";
import AddTask from "./AddTasks.jsx";
import AssignedSuccessModal from "./AssignedSuccessModal.jsx";
import CalendarModal from "./CalendarModel.jsx";
import {tasks} from "./tasks.js";

const LandingPage = () => {
  const [addTask, setAddTask] = useState(false); 
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Deadline");
  const handleAddTask = () => {
    console.log("Add Task")
    console.log(addTask)
    if(!addTask){
      setAddTask(true);
      console.log("Task added")
  }
    // !addTask ? setAddTask(true) : setAddTask(false)
    // !addTask ? setAddTask(true) : setAddTask(false);
  }


  const handleDateSelect = (date) => {
      setSelectedDate(date);
      setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
      // setAddTask(false)
      setShowCalendar(!showCalendar);
  };

  const handleAssignToggle = () => {
    setAddTask(false)
    setShowAssignModal(true);
  };



  return (
    <div className="bg-white min-h-screen px-5 mt-10 mb-16">
      {/* Search & Filter */}
      <div className="flex justify-between items-center bg-[#ECEDEE] px-5 py-5 rounded-3xl shadow-md shadow-stone-400 ">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md shadow-stone-400 w-[284px]">
          <FaSearch className="text-gray-700  h-[20px] w-[20px]" />
          <input type="text" placeholder="Search Project" className="ml-2 outline-none w-full bg-white" />
        </div>
        <button className="flex text-gray-600 items-center bg-white px-4 py-2 rounded-md shadow-md border-gray-400 border-2">
          <FaFilter className="mr-2 text-gray-700 h-[16px] w-[16px]" />
          <span className="font-[poppin] text-[14px]">Filter</span>
          <FaAngleDown className="ml-2 text-gray-500  h-[16px] w-[16px]" />
        </button>
      </div>

      {/* Sidebar Summary */}
      <div className="flex mt-7 space-x-12">
        <div className="w-[240px] md:w-[322px] flex flex-col gap-4">
          <SummaryCard icon={<FaExclamationTriangle className="text-red-100 bg-red-500 h-12 w-12 p-3 rounded-full" />} title="Expired Tasks" count={5} />
          <SummaryCard icon={<FaClipboardList className="text-orange-100 bg-orange-500 h-12 w-12 p-3 rounded-full" />} title="All Active Tasks" count={7} />
          <SummaryCard icon={<FaCheckCircle className="text-blue-100 bg-blue-500 h-12 w-12 p-3 rounded-full" />} title="Completed Tasks" count="2/7" />
          <button onClick={handleAddTask} className="bg-black py-3 rounded-2xl shadow-md text-sm text-gray-200">+ Add Task</button>
        </div>

        {addTask && <AddTask 
                      addTask={addTask} 
                      setAddTask={setAddTask} 
                      handleCalendarToggle={handleCalendarToggle}
                      handleAssignToggle={handleAssignToggle}
                      selectedDate={selectedDate}
                    />}
        {showCalendar && <CalendarModal  
                      handleDateSelect={handleDateSelect} 
                      setShowCalendar={setShowCalendar}
                      setShowAssignModal={setShowAssignModal}

                    />}
        {showAssignModal && <AssignedSuccessModal
                      setShowAssignModal={setShowAssignModal}

                    />}

        {/* Kanban Board */}
        <div className="flex-grow grid grid-cols-3 gap-14 ml-6">
          <TaskColumn title="To Do" color="indigo" tasks={tasks.todo} />
          <TaskColumn title="On Progress" color="orange" tasks={tasks.progress} />
          <TaskColumn title="Done" color="green" tasks={tasks.done} />
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ icon, title, count }) => (
  <div className="bg-[#ECEDEE] p-4 rounded-lg items-center h-[190px] shadow-md shadow-stone-400">
    <div className="text-2xl rounded-full ">{icon}</div>
    <div className="">
      <h4 className="text-gray-500 text-sm my-4">{title}</h4>
      <p className="text-gray-900 text-3xl font-bold">{count}</p>
    </div>
  </div>
);

// Task Column Component
const TaskColumn = ({ title, color, tasks }) => (
  <div className="bg-[#ECEDEE] p-4 rounded-lg shadow-md shadow-stone-400 ">
    <h3 className={`font-bold text-lg mb-4 flex items-center justify-center`}>
      <FaCircle className={`text-[8px] text-${color}-600`} />
      <span className="mx-2 text-gray-600 text-md">{title}</span>
      <span className="bg-gray-300/60 text-gray-400 text-xs rounded-full px-1">{tasks.length}</span>
    </h3>
    <hr className={`my-2 border-2 border-${color}-600  sm:mx-auto lg:my-4`} />
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
);

// Task Card Component
const TaskCard = ({ task }) => (
  <div className="bg-[#FFFF] rounded-xl shadow-md shadow-stone-400 border-l-4 border-gray-300 py-4 px-4">
    <div className="flex justify-between">
      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${task.priority === "High" ? "bg-red-100 text-red-600" : task.priority === "Low" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
        {task.priority}
      </span>
      <span className="font-bold mr-2">...</span>
    </div>
    <h4 className="text-md font-semibold mt-2 ">{task.title}</h4>
    {task.description && <p className="text-gray-600 text-xs mt-1">{task.description}</p>}
    <p className="text-xs text-gray-500 mt-7">
      <strong>Deadline:</strong> {task.deadline}
    </p>
  </div>
);


export default LandingPage;
