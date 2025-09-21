import { storageService } from './async-storage.service.js';

export const userService = {
   getLoggedinUser,
   login,
   logout,
   signup,
   getById,
   query,
   getEmptyCredentials,
   save,
};
const STORAGE_KEY_LOGGEDIN = 'user';
const STORAGE_KEY = 'userDB';

function query() {
   return storageService.query(STORAGE_KEY);
}

function getById(userId) {
   return storageService.get(STORAGE_KEY, userId);
}

function login({ username, password }) {
   return storageService.query(STORAGE_KEY).then((users) => {
      const user = users.find((user) => user.username === username);
      if (user) return _setLoggedinUser(user);
      else return Promise.reject('Invalid login');
   });
}

function signup({ username, password, fullname }) {
   const user = { username, password, fullname };
   user.createdAt = user.updatedAt = Date.now();
   user.balance = 0;
   user.activities = [];
   user.prefs = _getDefaultPrefs();

   return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser);
}

function logout() {
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
   return Promise.resolve();
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function save(updatedUser) {
   return getById(updatedUser._id)
      .then((user) => {
         if (updatedUser.activities) user.activities = [...user.activities, ...updatedUser.activities];
         return storageService.put(STORAGE_KEY, {
            ...user,
            ...updatedUser,
            updatedAt: Date.now(),
         });
      })
      .then((user) => {
         _setLoggedinUser(user);
         return user;
      });
}

function _setLoggedinUser(user) {
   const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, prefs: user.prefs };
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
   return userToSave;
}

function _getDefaultPrefs() {
   return { color: 'black', bgColor: 'white' };
}

function getEmptyCredentials() {
   return {
      fullname: '',
      username: 'muki',
      password: 'muki1',
   };
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999,
//    balance: 10000,
//    activities: [{txt: 'Added a Todo', at: 1523873242735}],
//    prefs: {color: 'black', bgColor: 'white'}
// }
