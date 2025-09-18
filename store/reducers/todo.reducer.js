import { todoService } from '../../services/todo.service.js';

// Todo
export const SET_TODOS = 'SET_TODOS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SET_FILTER_BY = 'SET_FILTER_BY';
export const UNDO_TODOS = 'UNDO_TODOS';

const initialState = {
   todos: [],
   filterBy: {},
};

export function todoReducer(state = initialState, cmd) {
   switch (cmd.type) {
      case SET_TODOS: {
         return { ...state, todos: cmd.todos };
      }
      case ADD_TODO: {
         return { ...state, todos: [...state.todos, cmd.todo] };
      }
      case REMOVE_TODO: {
         return { ...state, todos: state.todos.filter((todo) => todo._id !== cmd.todoId), lastTodos: [...state.todos] };
      }
      case UPDATE_TODO: {
         return { ...state, todos: state.todos.map((todo) => (todo._id !== cmd.todo._id ? todo : cmd.todo)) };
      }
      case UNDO_TODOS: {
         return { ...state, todos: [...state.lastTodos] };
      }
      case SET_FILTER_BY: {
         return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } };
      }
      default:
         return state;
   }
}
