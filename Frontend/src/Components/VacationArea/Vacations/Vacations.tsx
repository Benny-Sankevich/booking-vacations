import React, { Component } from "react";
import VacationsModel from "../../Models/VacationsModel";
import "./Vacations.css";
import Axios from "axios";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import store from "../../../Redux/Store";
import { vacationDownloadedAction } from "../../../Redux/VacationsState";
import FollowsVacationsCard from "../FollowsVacationsCard/FollowsVacationsCard";
import { History } from "history";
import { Globals } from "../../../Services/GlobalsUrl";
import { Unsubscribe } from "redux";
import { LinearProgress } from "@material-ui/core";
import { userIsLoggedOut, vacationSortHandler } from "../../../Services/GlobalFunctions";
import { errorsService } from "../../../Services/GlobalErrorsMessage";

interface VacationsProps {
    history: History;
}
interface VacationsState {
    vacations: VacationsModel[];
}
//Main vacation page
class Vacations extends Component<VacationsProps, VacationsState> {

    private unsubscribe: Unsubscribe;

    public constructor(props: VacationsProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacationsState.vacations,
        };
    }
    async componentDidMount() {
        try {
            //Check if user is login
            if (!store.getState().usersState.userIsLoggedIn) {
                this.props.history.push("/login");
                return;
            }
            this.unsubscribe = store.subscribe(() => {
                const vacations = vacationSortHandler(store.getState().vacationsState.vacations);
                this.setState({ vacations });
            });
            //if state empty go to server
            if (store.getState().vacationsState.vacations.length === 0) {
                const response = await Axios.get<VacationsModel[]>(Globals.vacationsUrl);
                const vacations = vacationSortHandler(response.data);
                this.setState({ vacations });
                store.dispatch(vacationDownloadedAction(vacations));
            }
        }
        catch (error) {
            //if token expired
            if ((error.response?.data === "Your login session has expired. Please login again.") || (error.response?.data === "You are not logged-in!")) {
                userIsLoggedOut();
                alert(error.response.data);
                this.props.history.push("/login");
            }
            alert(errorsService.getError(error));
        }
    }

    public render(): JSX.Element {
        return (
            <div className="FollowsVacations">
                {/* Check if user is login and if user is admin */}
                {this.state.vacations.length === 0 && <LinearProgress />}
                {store.getState().usersState.userIsLoggedIn && this.state.vacations.map(v =>
                    store.getState().usersState.user.isAdmin === 0 ?
                        <FollowsVacationsCard key={v.vacationUuid} singleFollowsVacation={v} />
                        : <AdminVacationCard key={v.vacationUuid} singleVacation={v} />)}
            </div>
        );
    }
    public componentWillUnmount(): void {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
export default Vacations;