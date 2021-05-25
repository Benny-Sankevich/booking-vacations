//Global Url functions
export class Globals {

    public static vacationsUrl: string;
    public static followUrl: string;
    public static authUrl: string;
    public static socketUrl: string;

    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationsUrl = "https://booking-vacation.herokuapp.com/api/vacations/";
            Globals.followUrl = "https://booking-vacation.herokuapp.com/api/follows/";
            Globals.authUrl = "https://booking-vacation.herokuapp.com/api/auth/";
            Globals.socketUrl = "https://booking-vacation.herokuapp.com/";
        }
        else {
            Globals.vacationsUrl = "http://localhost:3001/api/vacations/";
            Globals.followUrl = "http://localhost:3001/api/follows/";
            Globals.authUrl = "http://localhost:3001/api/auth/";
            Globals.socketUrl = "http://localhost:3001";
        }
    }
}

Globals.init();