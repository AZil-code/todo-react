import { userService } from '../../services/user.service.js';
import { SET_USER } from '../reducers/user.reducer.js';
import { store } from '../store.js';

export async function login(credentials) {
   try {
      const user = await userService.login(credentials);
      store.dispatch({ type: SET_USER, user });
   } catch (error) {
      console.error('user actions -> Cannot login: ', error);
      throw error;
   }
}

export function signup(credentials) {
   return userService
      .signup(credentials)
      .then((user) => {
         store.dispatch({ type: SET_USER, user });
      })
      .catch((error) => {
         console.error('user actions -> Cannot sign up: ', error);
         throw error;
      });
}

export function logout() {
   return userService
      .logout()
      .then(() => store.dispatch({ type: SET_USER, user: null }))
      .catch((error) => {
         console.error('user actions -> Cannot logout: ', error);
         throw error;
      });
}
