import React from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {
    //Links if user is admin
    const addVacation = <div> <span> | </span> <NavLink to="/vacations/new">Add Vacations</NavLink><span> | </span>
        <NavLink to="/vacations/bar-graph">Follows Graph</NavLink></div>;

    return (
        <div className="Menu">
            <nav>
                <NavLink to="/home">Home</NavLink>
                <span> | </span>
                <NavLink to="/vacations">Vacations</NavLink>

                {(store.getState().usersState.userIsLoggedIn) && (store.getState().usersState.user.isAdmin === 1) ?
                    addVacation : null}
            </nav>
        </div>
    );
}

export default Menu;