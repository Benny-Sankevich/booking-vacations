import React from "react";
import "./AdminVacationCard.css";
import Axios from "axios";
import { useHistory } from "react-router";
import VacationsModel from "../../Models/VacationsModel";
import clsx from "clsx";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { grey, red } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { NavLink } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { Globals } from "../../../Services/GlobalsUrl";
import { changeDateFormat, userIsLoggedOut } from "../../../Services/GlobalFunctions";
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import { errorsService } from "../../../Services/GlobalErrorsMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        width: 345,
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    avatar: {
        backgroundColor: red[500],
    },
}));

interface AdminVacationCardProps {
    singleVacation: VacationsModel;
}
//Cards vacations of admin
function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const history = useHistory();
    //Delete vacation function
    async function deleteVacation() {
        const answer = window.confirm("Are You Sure?");
        if (!answer) {
            return;
        }
        try {
            await Axios.delete<VacationsModel>(Globals.vacationsUrl + props.singleVacation.vacationUuid);
            history.push("/vacations");
        }
        catch (error) {
            //if token expired
            if ((error.response?.data === "Your login session has expired. Please login again.") || (error.response?.data === "You are not logged-in!")) {
                userIsLoggedOut();
                alert(error.response.data);
                history.push("/login");
            }
            alert(errorsService.getError(error));
        }
    }
    //Change Vacation Date format
    props.singleVacation.fromDate = changeDateFormat(props.singleVacation.fromDate);
    props.singleVacation.toDate = changeDateFormat(props.singleVacation.toDate);

    return (
        <div className="AdminVacationCard">
            <Card className={classes.root}>
                <CardHeader className="Header"
                    title={props.singleVacation.destination}
                />
                <CardMedia
                    className={classes.media} title="Vacation Image"
                    image={Globals.vacationsUrl + "images/" + props.singleVacation.imageFileName}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        From Date: {props.singleVacation.fromDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        To Date: {props.singleVacation.toDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: ${props.singleVacation.price}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-expanded={expanded}
                        aria-label="Edit Vacation">
                        <NavLink to={"/vacations/edit/" + props.singleVacation.vacationUuid}>
                            <EditTwoToneIcon />
                        </NavLink>
                    </IconButton>
                    <IconButton onClick={deleteVacation}
                        aria-expanded={expanded}
                        aria-label="Delete Vacation">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-expanded={expanded} aria-label="add to favorites">
                        <RadioButtonUncheckedRoundedIcon fontSize="large" />
                        <Typography className="FollowsNumber">
                            {props.singleVacation.countFollows ? props.singleVacation.countFollows : 0}
                        </Typography>
                    </IconButton>
                    <InfoIcon
                        style={{ color: grey[600] }}
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    ></InfoIcon>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                            {props.singleVacation.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div >
    );
}

export default AdminVacationCard;