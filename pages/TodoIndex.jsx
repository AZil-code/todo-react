import { TodoFilter } from '../cmps/TodoFilter.jsx';
import { TodoList } from '../cmps/TodoList.jsx';
import { DataTable } from '../cmps/data-table/DataTable.jsx';
import { todoService } from '../services/todo.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { loadTodos, removeTodoOptimistic, saveTodo } from '../store/actions/todo.actions.js';

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
   const todos = useSelector((storeState) => storeState.todoModule.todos);

   // Special hook for accessing search-params:
   const [searchParams, setSearchParams] = useSearchParams();

   const defaultFilter = todoService.getFilterFromSearchParams(searchParams);

   const [filterBy, setFilterBy] = useState(defaultFilter);

   useEffect(() => {
      setSearchParams(filterBy);
      loadTodos(filterBy).catch(() => showErrorMsg('Cannot load todos'));
   }, [filterBy]);

   function onRemoveTodo(todoId) {
      removeTodoOptimistic(todoId)
         .then(() => showSuccessMsg('Todo removed successfully!'))
         .catch((err) => showErrorMsg('Failed removing todo item! ', err));
   }

   function onToggleTodo(todo) {
      const todoToSave = { ...todo, isDone: !todo.isDone };

      saveTodo(todoToSave)
         .then((savedTodo) => showSuccessMsg(`Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`))
         .catch(() => showErrorMsg('Cannot togle todo ' + todo._id));
   }

   if (!todos) return <div>Loading...</div>;
   return (
      <section className="todo-index">
         <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
         <div>
            <Link to="/todo/edit" className="btn">
               Add Todo
            </Link>
         </div>
         <h2>Todos List</h2>
         <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
         <hr />
         <h2>Todos Table</h2>
         <div style={{ width: '60%', margin: 'auto' }}>
            <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
         </div>
      </section>
   );
}
