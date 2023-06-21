import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodosAction, fetchAllTodos } from "./store";


function App() {


  const dispatch = useDispatch()
  const { todos, todosPerPage, currentPage } = useSelector(state => state.todoStore)


  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])


  console.log("todos", todos)

  


  const totalPages = Math.ceil(todos.length / todosPerPage)

  const pages = [...Array(totalPages + 1).keys()].slice(1)

  const indexOfLastPage = currentPage * todosPerPage
  const indexofFirstPage = indexOfLastPage - todosPerPage


  const visibleTodos = todos.slice(indexofFirstPage, indexOfLastPage)



  const navigatePrev = ()=>{
    if(currentPage !== 1){
      dispatch(TodosAction.onNavigatePrev())
    }
  }


  const navigateNext = ()=>{
    if(currentPage !== totalPages){
      dispatch(TodosAction.onNavigateNext())
    }
  }


  const handleChangePage = (_p)=>{
    dispatch(TodosAction.onClickCurrentPage(_p))
  }



  // const onChangeTodosPerpage =()=>{}


  return (
    <>
      <div>
        <h1>Redux toolkit - pagination </h1>

        {/* <div>
          {JSON.stringify(todos)}
        </div> */}


        <div className="pagination-content">
          <span onClick={navigatePrev} className="prevButton">Prev</span>
          {pages.map((_p) => (<span className="pageNumber" key={_p} onClick={()=> handleChangePage.call(null , _p)}>{_p}</span>))}
          <span onClick={navigateNext} className="nextButton">Next</span>
        </div>


        <div>
          <ul>
            {visibleTodos.map((_todo) => (
              <li key={_todo.id}><span>{_todo.id}</span>--{_todo.title}</li>
            ))}
          </ul>
        </div>

        <hr />
        <div>
          Page {currentPage} of {totalPages}
        </div>

        <hr/>
        <div>
          <select onChange={(event)=>{
            dispatch(TodosAction.onChangeTodosPerpage(event.target.value))
          }}>
            <option value={"10"}>10</option>
            <option value={"50"}>50</option>
            <option value={'100'}>100</option>
            <option value={'200'}>200</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default App
