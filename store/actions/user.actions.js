import { userService } from '../../services/user.service.js';
import { utilService } from '../../services/util.service.js';
import { INCREMENT_BALANCE, UPDATE_USER, SET_USER } from '../reducers/user.reducer.js';
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

export async function incrementBalance() {
   try {
      const user = userService.getLoggedinUser();
      user.balance += 10;
      const updatedUser = await userService.save(user);
      store.dispatch({ type: INCREMENT_BALANCE, balance: updatedUser.balance });
   } catch (error) {
      console.error('user actions -> Cannot increment balance: ', error);
      throw error;
   }
}

export function logActivity(activitytxt) {
   const user = userService.getLoggedinUser();
   user.activities = [{ txt: activitytxt, at: Date.now() }];
   return userService
      .save(user)
      .then((user) => user.activity)
      .catch((error) => {
         console.error('user actions -> Cannot log activity: ', error);
         throw error;
      });
}

export function updateUser(updatedUser) {
   const currUser = userService.getLoggedinUser();
   return userService
      .save({ ...currUser, ...updatedUser })
      .then(() => store.dispatch({ type: UPDATE_USER, newUser: updatedUser }))
      .catch((error) => {
         console.error('user actions -> Cannot set preferences: ', error);
         throw error;
      });
}

// export function setAppColors(prefs) {
//    const colors = {};
//    colors[--gray3] = prefs.color;
//    utilService.setAppColors(colors);
// }
