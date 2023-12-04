import letters from "redux/modules/letters";
import member from "redux/modules/member";
import authSlice from "redux/modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

//const rootReducer = combineReducers({ letters, member });

//const store = createStore(rootReducer, devToolsEnhancer());

const store = configureStore({
  reducer: {
    letters,
    member,
    authSlice,
  },
});

export default store;
