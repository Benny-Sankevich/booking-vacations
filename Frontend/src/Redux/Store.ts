import { combineReducers, createStore } from "redux";
import { usersReducer } from "./UsersState";
import { vacationsReducer } from "./VacationsState";

const reducer = combineReducers({ usersState: usersReducer, vacationsState: vacationsReducer });
const store = createStore(reducer);
export default store;