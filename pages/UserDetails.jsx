import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { updateUser } from '../store/actions/user.actions.js';

const { useState, useEffect } = React;
const { useSelector } = ReactRedux;
const { useParams } = ReactRouterDOM;

export function UserDetails() {
   const user = useSelector((storeState) => storeState.userModule.loggedInUser);
   const { userId } = useParams();
   const [userToEdit, setUserToEdit] = useState(user ? { ...user } : {});

   function handleChange({ target }) {
      let field;
      let value;
      if (target.name === 'fullname') {
         value = target.value;
         field = target.name;
      } else {
         field = 'prefs';
         value = { ...userToEdit.prefs, [target.name]: target.value };
      }

      setUserToEdit((prev) => ({ ...prev, [field]: value }));
   }

   function onSavePrefs(ev) {
      ev.preventDefault();
      updateUser(userToEdit)
         .then(() => showSuccessMsg('User preferences successfully set!'))
         .catch(() => showErrorMsg('Cannot change user preferences!'));
   }

   if (!user || userId !== user._id) return <div>Unauthorized!</div>;
   const { color, bgColor } = userToEdit.prefs;
   return (
      <section className="user-details">
         <h2>Profile</h2>
         <form onSubmit={onSavePrefs}>
            <label htmlFor="fullname">Name: </label>
            <input
               value={userToEdit.fullname}
               onChange={handleChange}
               type="text"
               placeholder="Your name"
               id="fullname"
               name="fullname"
            />
            <label htmlFor="color">Color: </label>
            <input value={color} onChange={handleChange} type="color" id="color" name="color" />
            <label htmlFor="bgColor">Background Color: </label>
            <input value={bgColor} onChange={handleChange} type="color" id="bgColor" name="bgColor" />

            <button>Save</button>
         </form>
      </section>
   );
}
