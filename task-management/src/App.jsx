import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaSearch, FaFilter, FaExclamationTriangle, FaClipboardList, FaCheckCircle, FaAngleDown, } from "react-icons/fa"
import AddTask from './components/AddTasks.jsx'
import AssignedSuccessModal from './components/AssignedSuccessModal.jsx'
import CalendarModal from './components/CalendarModel.jsx'
import SummaryCard from './components/SummaryCard.jsx'
import TaskColumn from './components/TaskColumn'

const API_URL = import.meta.env.VITE_BACKEND_API;

function App() {

  // const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [inProgressTasks, setInProgressTasks] = useState();
  const [timeoutTasks, setTimeoutTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("Select Deadline");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    let isMount = true;

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-all-tasks`);

        if (isMount) {
          const data = response.data?.data || [];
          // setResponseData(response.data);
          setInProgressTasks(data.filter((task) => task.status === "InProgress"));
          setTimeoutTasks(data.filter((task) => task.status === "Timeout"));
          setCompletedTasks(data.filter((task) => task.status === "Completed"));
          setLoading(false);
        }

      } catch (err) {
        if (isMount) {
          setError(err.message || "An error occurred while fechting tasks.");
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      isMount = false; // Cleanup function to prevent state updates on unmount
    };
  }, []);

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

  const handleAssignToggle = () => {
    setAddTask(false); 
    setShowAssignModal(true);
  };


  return (
    <>
      <div className="bg-white min-h-screen px-3 mt-6 md:px-5 md:mt-10 mb-16">
        {/* Search & Filter */}
        <div className="flex w-full justify-between items-center bg-[#ECEDEE] py-3 px-2 md:px-5 md:py-5 rounded-3xl shadow-md shadow-stone-400 ">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md shadow-stone-400 w-[284px]">
            <FaSearch className="text-gray-700  lg:h-[20px] w-[20px]" />
            <input type="text" placeholder="Search Project" className="ml-2 outline-none w-full bg-white" />
          </div>
          <button className="flex text-gray-600 items-center bg-white px-1 md:px-4 py-2 ml-3 rounded-md shadow-md border-gray-400 border-2">
            <FaFilter className="md:mr-2 text-gray-700 h-[16px] w-[16px]" />
            <span className="hidden md:block font-[poppin] text-[14px]">Filter</span>
            <FaAngleDown className="md:ml-2 text-gray-500  h-[16px] w-[16px]" />
          </button>
        </div>

        {/* Sidebar Summary */}
        <div className="flex mt-7 space-x-5 lg:space-x-12">

          <div className=" w-[200px] md:w-[322px] flex flex-col gap-4">
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
            setAddTask={setAddTask}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            dueDate={dueDate}
            setDueDate={setDueDate}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            handleAssignToggle={handleAssignToggle}
          />}

          {showAssignModal && <AssignedSuccessModal
            setShowAssignModal={setShowAssignModal}
          />}

          {/* Columns */}
          <div className="flex-grow grid md:grid-cols-3  gap-5 lg:gap-10 md:ml-6">

            {
              <TaskColumn
                key={1}
                title={"Inprogress"}
                color={"yellow"}
                tasks={inProgressTasks}
                setAddTask={setAddTask}
                handleAssignToggle={handleAssignToggle}
              />
            }
            {
              <TaskColumn
                key={2}
                title={"Completed"}
                color={"red"}
                tasks={completedTasks}
                setAddTask={setAddTask}
                handleAssignToggle={handleAssignToggle}
              />
            }
            {
              <TaskColumn
                key={3}
                title={"Timeout"}
                color={"green"}
                tasks={timeoutTasks}
                setAddTask={setAddTask}
                handleAssignToggle={handleAssignToggle}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
