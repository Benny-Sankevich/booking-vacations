import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthLogin from "../../AuthArea/AuthLogin/AuthLogin";
import AuthRegister from "../../AuthArea/AuthRegister/AuthRegister";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import Vacations from "../../VacationArea/Vacations/Vacations";
import Page404 from "../Page404/Page404";
import HomePage from "../../HomeArea/HomePage/HomePage";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import AppAppBar from "../AppBar/AppAppBar";
import BarChart from "../../VacationArea/BarChart/BarChart";

//Routing page
function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/app" component={AppAppBar} exact />
                <Route path="/login" component={AuthLogin} exact />
                <Route path="/register" component={AuthRegister} exact />
                <Route path="/home" component={HomePage} exact />
                <Route path="/vacations" component={Vacations} exact />
                <Route path="/vacations/new" component={AddVacation} exact />
                <Route path="/vacations/edit/:vacationUuid" component={EditVacation} exact />
                <Route path="/vacations/bar-graph" component={BarChart} exact />
                <Redirect from="/" to="/home" exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}
export default Routing;