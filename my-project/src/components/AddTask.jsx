import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid4} from 'uuid';
import { addTask } from "../features/taskSlice";

const AddTask = () => {

    const [title , setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status , setStatus] = useState('To Do');
    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newTask = {
            id: uuid4(),
            title,
            description,
            status
        }
        dispatch(addTask(newTask))
        setTitle('')
        setDescription('')
        setStatus('')
    }
    return (
      <form className="mb-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Add New Task</h2>
  
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="mb-4">
          <textarea
            placeholder="Task Description"
            rows="3"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="mb-4">
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" value={status}
            onChange={(e)=> setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
  
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-200"
        >
          Add Task
        </button>
      </form>
    );
  };
  
  export default AddTask;
  