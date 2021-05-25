import UsersModel from "../Components/Models/UserModel";
import Axios from "axios";
import store from "../Redux/Store";
import { userLoggedOutAction } from "../Redux/UsersState";
import { socketManagerInstance } from "../Socket.io/SocketManager";
import { vacationResetAction } from "../Redux/VacationsState";
import VacationsModel from "../Components/Models/VacationsModel";

//Global Function

//Change format of date same of the input type date
export function changeDateFormat(date: string) {
    const originalDate = new Date(date);
    return originalDate.toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll("/", "-");
}
//Set Token in Header
export function settingHeaders(user: UsersModel) {
    Axios.defaults.headers["authorization"] = `Bearer ${user.token}`;
}

//Function of user is logout
export function userIsLoggedOut() {
    store.dispatch(userLoggedOutAction());
    store.dispatch(vacationResetAction());
    sessionStorage.clear();
    delete Axios.defaults.headers["authorization"];
    socketManagerInstance.disconnect();
}

//Sort the array
export function vacationSortHandler(vacations: VacationsModel[]) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        const userId = user.userId;
        vacations.sort(a => a.followers && a.followers.includes(userId.toString()) ? -1 : 1);
        return vacations;
    }
}