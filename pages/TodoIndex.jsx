import { TodoFilter } from '../cmps/TodoFilter.jsx';
import { TodoList } from '../cmps/TodoList.jsx';
import { DataTable } from '../cmps/data-table/DataTable.jsx';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { loadTodos, removeTodoOptimistic, saveTodo, setFilterBy } from '../store/actions/todo.actions.js';

const { useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector } = ReactRedux;

export function TodoIndex() {
   const todos = useSelector((storeState) => storeState.todoModule.todos);
   const filterBy = useSelector((storeState) => storeState.todoModule.filterBy);
   const [searchParams, setSearchParams] = useSearchParams();

   useEffect(() => {
      setFilterBy(extractSearchParams());
   }, [searchParams]);

   useEffect(() => {
      loadTodos(filterBy).catch(() => showErrorMsg('Cannot load todos'));
   }, [filterBy]);

   function onRemoveTodo(todoId) {
      removeTodoOptimistic(todoId)
         .then(() => showSuccessMsg('Todo removed successfully!'))
         .catch((err) => showErrorMsg('Failed removing todo item! ', err));
   }

   function onSetFilterBy(newFilter) {
      updateSearchParams({ ...filterBy, ...newFilter });
   }

   function onToggleTodo(todo) {
      const todoToSave = { ...todo, isDone: !todo.isDone };

      saveTodo(todoToSave)
         .then((savedTodo) => showSuccessMsg(`Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`))
         .catch(() => showErrorMsg('Cannot togle todo ' + todo._id));
   }

   function extractSearchParams() {
      return {
         txt: searchParams.get('txt'),
         importance: searchParams.get('importance'),
      };
   }

   function updateSearchParams(filterBy) {
      const newParams = {};
      if (filterBy.txt) newParams.txt = filterBy.txt;
      if (filterBy.importance) newParams.importance = filterBy.importance;
      setSearchParams(newParams);
   }

   if (!todos) return <div>Loading...</div>;
   return (
      <section className="todo-index">
         <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
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
