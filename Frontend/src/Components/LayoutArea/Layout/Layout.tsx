import React from "react";
import { BrowserRouter } from "react-router-dom";
import store from "../../../Redux/Store";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import AppAppBar from "../AppBar/AppAppBar";
import Routing from "../Routing/Routing";
import "./Layout.css";
//Main Page
function Layout(): JSX.Element {
    //if user login connect to socket
    if (store.getState().usersState.userIsLoggedIn) {
        socketManagerInstance.connect();
    }
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <AppAppBar />
                </header>
                <main>
                    <Routing />
                </main>
            </div>
        </BrowserRouter>
    );
}
export default Layout;