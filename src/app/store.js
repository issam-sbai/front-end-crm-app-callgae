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
import userReducer    from '../features/userSlice';
import equipeReducer  from '../features/equipeSlice';
import fieldsReducer  from '../features/fieldsSlice';  // Import the dynamic fields reducer
import historyDataReducer   from '../features/historyDataSlice'; 
const store = configureStore({
  reducer: {
    clients: clientsReducer,
    equipe:  equipeReducer,
    user:    userReducer,
    fields:  fieldsReducer,   // Add the fields slice here
    history: historyDataReducer, 
  },
});

export default store;