import { todoReducer } from './reducers/todo.reducer.js';
import { userReducer } from './reducers/user.reducer.js';

const { createStore, combineReducers, compose } = Redux;

const rootReducer = combineReducers({
   todoModule: todoReducer,
   userModule: userReducer,
});

export const store = createStore(rootReducer);
store.subscribe(() => console.log('Current statea is: ', store.getState()));
