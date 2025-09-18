import { todoService } from '../../services/todo.service.js';
import { ADD_TODO, REMOVE_TODO, SET_FILTER_BY, SET_TODOS, UNDO_TODOS, UPDATE_TODO } from '../reducers/todo.reducer.js';
import { store } from '../store.js';

export function loadTodos(filterBy) {
   return todoService
      .query(filterBy)
      .then((todos) => store.dispatch({ type: SET_TODOS, todos }))
      .catch((error) => {
         console.error('todo action -> Cannot load toods: ', error);
         throw error;
      });
}

export async function removeTodoOptimistic(todoId) {
   store.dispatch({ type: REMOVE_TODO, todoId });
   try {
      return await todoService.remove(todoId);
   } catch (error) {
      store.dispatch({ type: UNDO_TODOS });
      console.error('todo action -> Cannot remove car: ', error);
      throw error;
   }
}

export async function saveTodo(todo) {
   const type = todo._id ? UPDATE_TODO : ADD_TODO;
   console.log(type);
   try {
      const savedTodo = await todoService.save(todo);
      store.dispatch({ type: type, todo: savedTodo });
      return savedTodo;
   } catch (error) {
      console.error('todo action -> Cannot save car: ', error);
      throw error;
   }
}

export function setFilterBy(filterBy) {
   store.dispatch({ type: SET_FILTER_BY, filterBy });
}
