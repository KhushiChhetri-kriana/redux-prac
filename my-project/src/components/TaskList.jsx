import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchToDo } from '../features/taskSlice';
import EditTask from './EditTask';

const TaskList = () =>{
    const tasks = useSelector((state)=> state.task.tasks)
    const loading = useSelector((state)=> state.task.loading)
    const error = useSelector((state) => state.task.error)
    const dispatch = useDispatch();
    const handleDelete = (id)=>{
        dispatch(deleteTask(id))
    }

    useEffect(()=>{
        dispatch(fetchToDo())
    },[dispatch])

    if(loading){
        return <p>Tasks loading....</p>
    }

    if(error){
        return <p>There is an error</p>
    }

    return (
        <div>
            <div>
                <h2>Tasks</h2>
                <ul className='space-y-4'>
                    {tasks.map(task=> (
                        <li key={task.id} className='bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center'>
                            <div>
                               <p className='text-lg font-medium text-gray-800'>{task.title}</p> 
                               {task.description && <p className='text-gray-600'>{task.description}</p>}
                               <p className='mt-1 text-sm font-semibold'>Status : <span className='italic-underline'>{task.status}</span></p>
                            </div>

                            <div className='flex space-x-2'>
                                <EditTask task={task}/>
                                <button className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={()=> handleDelete(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TaskList;