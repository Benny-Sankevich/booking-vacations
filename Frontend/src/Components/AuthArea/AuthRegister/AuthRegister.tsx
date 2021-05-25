import React from "react";
import { History } from "history";
import Axios from "axios";
import { useForm } from "react-hook-form";
import UsersModel from "../../Models/UserModel";
import store from "../../../Redux/Store";
import { UserRegisteredAction } from "../../../Redux/UsersState";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from "@material-ui/core";
import { Globals } from "../../../Services/GlobalsUrl";
import { settingHeaders } from "../../../Services/GlobalFunctions";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import { NavLink } from "react-router-dom";
import { errorsService } from "../../../Services/GlobalErrorsMessage";

interface AddUsersProps {
    history: History;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

//User Register Function
function AuthRegister(props: AddUsersProps): JSX.Element {

    const classes = useStyles();

    const { register, handleSubmit } = useForm<UsersModel>();

    async function send(user: UsersModel) {
        try {
            const response = await Axios.post<UsersModel>(Globals.authUrl + "register", user);
            if (response.data !== null) {
                store.dispatch(UserRegisteredAction(response.data));
                settingHeaders(response.data);
                socketManagerInstance.connect();
                props.history.push("/vacations");
            }
            else {
                alert("the username you chosen already exists. please try another one.")
            }
        }
        catch (error) {
            alert(errorsService.getError(error));
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                <form className={classes.form} onSubmit={handleSubmit(send)}>
                    <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="First Name" name="firstName" type="text" autoComplete="firstName" inputProps={{ minLength: 2, maxLength: 30 }} autoFocus />
                    <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="Last Name" name="lastName" type="text" autoComplete="lastName" inputProps={{ minLength: 2, maxLength: 30 }} />
                    <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="Username" name="username" type="text" autoComplete="username" inputProps={{ minLength: 2, maxLength: 30 }} />
                    <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="Password" name="password" type="password" autoComplete="current-password" inputProps={{ minLength: 8, maxLength: 30 }} />

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >Sign In</Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to={"/login"}>
                                {" Already have an account?"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default AuthRegister;