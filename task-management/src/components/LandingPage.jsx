import React, {useState} from "react";
import { FaSearch, FaFilter, FaExclamationTriangle, FaClipboardList, FaCheckCircle, FaAngleDown, FaCircle } from "react-icons/fa";
import AddTask from "./AddTasks.jsx";
import AssignedSuccessModal from "./AssignedSuccessModal.jsx";
import CalendarModal from "./CalendarModel.jsx";
import {tasks} from "./tasks.js";
import SummaryCard from "./SummaryCard.jsx";
import TaskColumn from "./TaskColumn.jsx";

const LandingPage = () => {
  const [addTask, setAddTask] = useState(false); 
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Deadline");

  const handleDateSelect = (date) => {
      setSelectedDate(date);
      setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
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
          <SummaryCard 
            icon={<FaExclamationTriangle className="text-red-100 bg-red-500 h-12 w-12 p-3 rounded-full" />} title={"Expired Tasks"} 
            count={5} 
          />
          <SummaryCard 
            icon={<FaClipboardList className="text-orange-100 bg-orange-500 h-12 w-12 p-3 rounded-full" />} 
            title={"All Active Tasks"} count={7} 
          />
          <SummaryCard 
            icon={<FaCheckCircle className="text-blue-100 bg-blue-500 h-12 w-12 p-3 rounded-full" />} title={"Completed Tasks"} count="2/7" 
          />
          <button onClick={() => setAddTask(true)} className="bg-black py-3 rounded-2xl shadow-md text-sm text-gray-200">+ Add Task</button>
        </div>

        {/* Modals */}
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

        {/* Columns */}
        <div className="flex-grow grid grid-cols-3 gap-14 ml-6">
          <TaskColumn 
            title={"To Do"} 
            color={"indigo"} 
            tasks={tasks.todo} 
          />
          <TaskColumn 
            title={"On Progress"} 
            color={"orange"} 
            tasks={tasks.progress} 
          />
          <TaskColumn 
            title={"Done"} 
            color={"green"} 
            tasks={tasks.done} 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
