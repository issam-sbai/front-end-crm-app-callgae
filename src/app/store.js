// import { configureStore } from '@reduxjs/toolkit';
// import clientReducer from '../features/clientSlice';
// import userReducer from '../features/userSlice';
// import groupReducer from '../features/groupSlice';

// const store = configureStore({
//   reducer: {
//     client: clientReducer,
//     user: userReducer,
//     group: groupReducer,
//   },
// });

// export default store;


// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../features/clientSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});

export default store;

