const { useState, useEffect } = React;
const { useSelector } = ReactRedux;
const { useParams } = ReactRouterDOM;

export function UserDetails() {
   const user = useSelector((storeState) => storeState.userModule.loggedInUser);
   const { userId } = useParams();

   if (userId !== user._id) return <div>Unauthorized!</div>;
   return (
      <section className="user-details">
         <h2>Profile</h2>
         <form onSubmit={'onSubmitFilter'}>
            <label htmlFor="fullName">Name: </label>
            <input
               value={user.fullname}
               onChange={'handleChange'}
               type="text"
               placeholder="Your name"
               id="fullName"
               name="fullName"
            />
            <label htmlFor="color">Color: </label>
            <input
               //    value={'importance'}
               onChange={'handleChange'}
               type="color"
               //    placeholder="By Importance"
               id="color"
               name="color"
            />
            <label htmlFor="bgColor">Background Color: </label>
            <input
               //    value={'bgColor'}
               onChange={'handleChange'}
               type="color"
               //    placeholder="By Importance"
               id="bgColor"
               name="bgColor"
            />

            <button>Save</button>
         </form>
      </section>
   );
}
