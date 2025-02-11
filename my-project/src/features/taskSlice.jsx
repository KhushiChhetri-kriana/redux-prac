import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    status: 'All' //used for the filter which is by default all
}

//creating a function to call and fetch API requests 

export const fetchToDo = createAsyncThunk('tasks/fetchToDo' , async ()=> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    return data.map( task => (
        {
            id : task.id,
            title : task.title,
            description: '',
            status: task.completed ? 'Completed' : 'To Do'
        }
    ))
})


//creating the slice

const taskSlice = createSlice(
    {
        name: 'task',//name of the slice
        initialState,
        reducers:{
            addTask : (state,action) => {
                state.tasks.push(action.payload)
            },
            editTask : (state,action) =>{
                state.tasks = state.tasks.map(task => (
                    task.id === action.payload.id ? action.payload : task
                ))
            },
            deleteTask: (state,action) => {
                state.tasks = state.tasks.filter(task=>task.id !==action.payload)
            }
        },
        extraReducers: (builder) =>{//it is for handling different conditions coming from api 
            builder.addCase(fetchToDo.pending,(state)=>{
                state.loading = true;
                state.error = null
            })

            .addCase(fetchToDo.fulfilled,(state,action)=>{
                state.loading=false;
                state.tasks=action.payload
            })

            .addCase(fetchToDo.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message
            })
        }

    }
)

export const {addTask,editTask,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;