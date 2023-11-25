// store.js

import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './rolesmanager';

export const Roles = configureStore({
  reducer: {
    role: roleReducer,
  },
});
