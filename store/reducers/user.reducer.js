import { userService } from '../../services/user.service.js';

export const SET_USER = 'SET_USER';
export const INCREMENT_BALANCE = 'INCREMENT_BALANCE';
export const UPDATE_USER = 'UPDATE_USER';

const initialState = {
   loggedInUser: userService.getLoggedinUser(),
};

export function userReducer(state = initialState, cmd) {
   switch (cmd.type) {
      case SET_USER: {
         return { ...state, loggedInUser: cmd.user };
      }
      case INCREMENT_BALANCE: {
         const loggedInUser = { ...state.loggedInUser, balance: cmd.balance };
         return { ...state, loggedInUser };
      }
      case UPDATE_USER:
         const loggedInUser = { ...state.loggedInUser, ...cmd.newUser };
         return { ...state, loggedInUser };
      default:
         return state;
   }
}
