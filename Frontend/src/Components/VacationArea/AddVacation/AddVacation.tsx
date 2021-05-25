import React, { useState } from "react";
import { History } from "history";
import "./AddVacation.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import VacationsModel from "../../Models/VacationsModel";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from "@material-ui/core";
import { Globals } from "../../../Services/GlobalsUrl";
import { NavLink } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import store from "../../../Redux/Store";
import { changeDateFormat, userIsLoggedOut } from "../../../Services/GlobalFunctions";
import { errorsService } from "../../../Services/GlobalErrorsMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
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

interface AddVacationProps {
    history: History;
}
//Add vacation function
function AddVacation(props: AddVacationProps): JSX.Element {
    //Show alert if vacation added
    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    const { register, handleSubmit } = useForm<VacationsModel>();

    const [formValidationDate, setFromValidation] = useState(changeDateFormat(new Date().toString()));
    //Check if user is login and is admin
    if (!store.getState().usersState.userIsLoggedIn || store.getState().usersState.user.isAdmin !== 1) {
        props.history.push("/home");
    }
    //Send data to backend
    async function send(vacation: VacationsModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("fromDate", vacation.fromDate.toString());
            myFormData.append("toDate", vacation.toDate.toString());
            myFormData.append("price", vacation.price.toString());
            myFormData.append("myImage", vacation.myImage.item(0));

            await Axios.post<VacationsModel>(Globals.vacationsUrl, myFormData);
            handleClick();
            setTimeout(() => {
                props.history.push("/vacations");
            }, 2001);
        }
        catch (error) {
            //if token expired
            if ((error.response?.data === "Your login session has expired. Please login again.") || (error.response?.data === "You are not logged-in!")) {
                userIsLoggedOut();
                alert(error.response.data);
                props.history.push("/login");
            }
            alert(errorsService.getError(error));
        }
    }
    return (
        <div className="AddVacation">
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} >
                    <Alert severity="success">Vacations has been successfully added.</Alert>
                </Snackbar>
            </div>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add Vacation
              </Typography>
                    <form onSubmit={handleSubmit(send)} className={classes.form} action="/upload-image" method="POST" encType="multipart/form-data">
                        <TextField type="text" variant="outlined" margin="normal" required fullWidth inputRef={register} label="Destination" name="destination" autoComplete="destination" inputProps={{ minLength: 2, maxLength: 14 }} autoFocus />
                        <TextField type="text" variant="outlined" margin="normal" required fullWidth inputRef={register} label="Description" name="description" autoComplete="description" inputProps={{ minLength: 2, maxLength: 5000 }} multiline />
                        <TextField type="date" variant="outlined" margin="normal" required fullWidth inputRef={register} helperText="From Date" name="fromDate" autoComplete="fromDate" inputProps={{ min: changeDateFormat(new Date().toString()) }} onChange={e => setFromValidation(e.target.value)} />
                        <TextField type="date" variant="outlined" margin="normal" required fullWidth inputRef={register} helperText="To Date" name="toDate" autoComplete="toDate" inputProps={{ min: changeDateFormat(new Date(formValidationDate).toString()) }} />
                        <TextField type="number" variant="outlined" margin="normal" required fullWidth inputRef={register} label="Price" name="price" inputProps={{ min: "0", max: "100000", step: "0.1" }} autoComplete="price" />
                        <TextField type="file" variant="outlined" margin="normal" required fullWidth inputRef={register} helperText="image" name="myImage" inputProps={{ accept: "image/*" }} autoComplete="myImage" />

                        < Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Add</Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to={"/vacations"}>
                                    {" Cancel"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default AddVacation;