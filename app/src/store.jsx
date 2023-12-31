import  ThunkMiddleware  from "redux-thunk";


import { applyMiddleware, configureStore, createSlice } from "@reduxjs/toolkit";



const todosSlice = createSlice({
    name : "todos" ,
    initialState : {
        todos : [],
        todosPerPage : 10,
        currentPage : 1,
    },

    reducers : {
        fetchTodos : (state , action) =>{
            state.todos = [...action.payload]
        },
        onNavigateNext : (state )=>{
            state.currentPage++
        },
        onNavigatePrev : (state)=>{
            state.currentPage--
        },
        onChangeTodosPerpage : (state , action)=>{
            state.todosPerPage = action.payload
        } ,
        
        onClickCurrentPage : (state ,action)=>{
            state.currentPage = action.payload
        }
    }
})





export const fetchAllTodos = ()=>{
    
    return async (dispatch) =>{
        const fetchTodosApi = async ()=>{
            const response = await fetch("https://jsonplaceholder.typicode.com/todos")
            return response
        }

        try{
            const res = await fetchTodosApi()
            const todos = await res.json()
            dispatch(todosSlice.actions.fetchTodos(todos.map(_todo => ({id : _todo.id , title : _todo.title}))))
        }catch(error){
            console.log(error)
        }
    }
}




const store = configureStore({
    reducer : {
        todoStore : todosSlice.reducer
    }
} , applyMiddleware(ThunkMiddleware))

// این ایتم میدلور رو اضافه داره و تا حالا باهاش کار نکردم 


export const TodosAction = todosSlice.actions;
export default store;

