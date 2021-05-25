import UserModel from "../Components/Models/UserModel";
import { settingHeaders } from "../Services/GlobalFunctions";

//User State
export class UserState {
    public user: UserModel = null;
    public userIsLoggedIn: boolean = false;

    constructor() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user && user.uuid !== null) {
            settingHeaders(user)
            this.user = user;
            this.userIsLoggedIn = true;
        }
    }
}

//User Action Type
export enum UserActionType {
    userLoggedIn = "userLoggedIn",
    UserRegistered = "UserRegistered",
    userLoggedOut = "userLoggedOut"
}
// User Action
export interface UserAction {
    type: UserActionType;
    payload?: any;
}

// User Action Creators: 
export function userLoggedInAction(user: UserModel): UserAction {
    return { type: UserActionType.userLoggedIn, payload: user };
}
export function UserRegisteredAction(user: UserModel): UserAction {
    return { type: UserActionType.UserRegistered, payload: user };
}
export function userLoggedOutAction(): UserAction {
    return { type: UserActionType.userLoggedOut };
}

export function usersReducer(currentState: UserState = new UserState(),
    action: UserAction): UserState {
    const newState = { ...currentState };

    switch (action.type) {
        case UserActionType.userLoggedIn:
            newState.user = action.payload;
            newState.userIsLoggedIn = true;
            break;

        case UserActionType.UserRegistered:
            newState.user = action.payload;
            newState.userIsLoggedIn = true;
            break;

        case UserActionType.userLoggedOut:
            newState.user = null;
            newState.userIsLoggedIn = false;
            break;
    }
    sessionStorage.setItem("user", JSON.stringify(newState.user));

    return newState;
}