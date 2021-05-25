import VacationsModel from "../Components/Models/VacationsModel";

//Vacation State
export class VacationState {
    public vacations: VacationsModel[] = []
}
//Vacation Action Type
export enum VacationsActionType {
    vacationDownloaded = "vacationDownloaded",
    vacationAdded = "vacationAdded",
    vacationUpdated = "vacationUpdated",
    vacationDeleted = "vacationDeleted",
    vacationResetState = "vacationResetState"
}
// Vacation Action
export interface VacationsAction {
    type: VacationsActionType;
    payload?: any;
}

export function vacationDownloadedAction(vacations: VacationsModel[]): VacationsAction {
    return { type: VacationsActionType.vacationDownloaded, payload: vacations };
}
export function vacationAddedAction(vacation: VacationsModel): VacationsAction {
    return { type: VacationsActionType.vacationAdded, payload: vacation };
}
export function vacationUpdatedAction(vacation: VacationsModel): VacationsAction {
    return { type: VacationsActionType.vacationUpdated, payload: vacation };
}
export function vacationDeletedAction(vacation: string): VacationsAction {
    return { type: VacationsActionType.vacationDeleted, payload: vacation };
}

export function vacationResetAction(): VacationsAction {
    return { type: VacationsActionType.vacationResetState };
}

export function vacationsReducer(currentState: VacationState = new VacationState(),
    action: VacationsAction): VacationState {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.vacationDownloaded:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.vacationAdded:
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.vacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationUuid === action.payload.vacationUuid);
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.vacationDeleted:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationUuid === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;

        case VacationsActionType.vacationResetState:
            newState.vacations = [];
            break;
    }

    return newState;
}