import { io, Socket } from "socket.io-client";
import VacationsModel from "../Components/Models/VacationsModel";
import store from "../Redux/Store";
import { vacationAddedAction, vacationDeletedAction, vacationUpdatedAction } from "../Redux/VacationsState";
import { Globals } from "../Services/GlobalsUrl";

//Socket io Manager
class SocketManager {

    private socket: Socket;

    public connect(): void {

        // Connect to socket.io:
        this.socket = io(Globals.socketUrl);

        // Listen to socket.io events:
        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationsModel) => {
            store.dispatch(vacationAddedAction(addedVacation));
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationsModel) => {
            store.dispatch(vacationUpdatedAction(updatedVacation))
        });

        this.socket.on("msg-from-server-vacation-deleted", (uuid: string) => {
            store.dispatch(vacationDeletedAction(uuid))
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default SocketManager;

export const socketManagerInstance = new SocketManager();