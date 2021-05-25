//Vacation data model
class VacationsModel {
    public vacationId: number;
    public vacationUuid: string;
    public destination: string;
    public description: string;
    public fromDate: string;
    public toDate: string;
    public price: number;
    public myImage: FileList;
    public imageFileName: string;
    public followers: string;
    public countFollows: number;
}
export default VacationsModel;