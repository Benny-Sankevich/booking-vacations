import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { History } from "history";
import { NavLink, RouteComponentProps } from "react-router-dom";
import store from "../../../Redux/Store";
import VacationsModel from "../../Models/VacationsModel";
import { vacationUpdatedAction } from "../../../Redux/VacationsState";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CardMedia, TextField } from "@material-ui/core";
import { Globals } from "../../../Services/GlobalsUrl";
import { changeDateFormat, userIsLoggedOut } from "../../../Services/GlobalFunctions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
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
    media: {
        height: 0,
        paddingTop: '56.25%',
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

interface MatchParams {
    vacationUuid: string;
}

interface EditVacationProps extends RouteComponentProps<MatchParams> {
    history: History;
}
//Edit vacation
function EditVacation(props: EditVacationProps): JSX.Element {
    //Alert if vacation update successful
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
    //Get All vacations from state
    let vacation = store.getState().vacationsState.vacations.find(v => v.vacationUuid === props.match.params.vacationUuid);
    //if user refresh the page and vacation is empty
    useEffect(() => {
        if (!vacation) {
            props.history.push("/vacations");
            return;
        }
    })
    if (vacation) {
        //Change Vacation Date format
        vacation.fromDate = changeDateFormat(vacation.fromDate);
        vacation.toDate = changeDateFormat(vacation.toDate);
    }
    const { register, handleSubmit } = useForm<VacationsModel>({ defaultValues: vacation });
    const [formValidationDate, setFromValidation] = useState(changeDateFormat(new Date().toString()));

    // update the vacation
    async function submit(vacation: VacationsModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("fromDate", vacation.fromDate.toString());
            myFormData.append("toDate", vacation.toDate.toString());
            myFormData.append("price", vacation.price.toString());
            myFormData.append("myImage", vacation.myImage.item(0));

            const response = await Axios.put<VacationsModel>(Globals.vacationsUrl + props.match.params.vacationUuid, myFormData);
            store.dispatch(vacationUpdatedAction(response.data));
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
        <div className="EditVacation">
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} >
                    <Alert severity="success">Vacations has been successfully Updated.</Alert>
                </Snackbar>
            </div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit Vacation
                </Typography>
                    <form onSubmit={handleSubmit(submit)} className={classes.form} action="/upload-image" method="POST" encType="multipart/form-data">
                        <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="Destination" name="destination" autoComplete="destination" inputProps={{ minLength: 2, maxLength: 14 }} autoFocus />
                        <TextField variant="outlined" margin="normal" required fullWidth inputRef={register} label="Description" name="description" autoComplete="description" inputProps={{ minLength: 2, maxLength: 5000 }} multiline />
                        <TextField type="date" variant="outlined" margin="normal" required fullWidth inputRef={register} helperText="From Date" name="fromDate" autoComplete="fromDate" inputProps={{ min: changeDateFormat(new Date().toString()) }} onChange={e => setFromValidation(e.target.value)} />
                        <TextField type="date" variant="outlined" margin="normal" required fullWidth inputRef={register} helperText="To Date" name="toDate" autoComplete="toDate" inputProps={{ min: changeDateFormat(new Date(formValidationDate).toString()) }} />
                        <TextField type="number" variant="outlined" margin="normal" required fullWidth inputRef={register} label="Price" name="price" inputProps={{ min: "0", max: "100000", step: "0.01" }} autoComplete="price" />
                        {vacation && <CardMedia className={classes.media} image={Globals.vacationsUrl + "images/" + vacation.imageFileName} title="Vacation Image" />}
                        <TextField type="file" variant="outlined" margin="normal" fullWidth inputRef={register} helperText="image" name="myImage" inputProps={{ accept: "image/*" }} autoComplete="myImage" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >Update</Button>
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

export default EditVacation;