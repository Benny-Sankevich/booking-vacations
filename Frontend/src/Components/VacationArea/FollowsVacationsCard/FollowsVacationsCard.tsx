import React from "react";
import VacationsModel from "../../Models/VacationsModel";
import "./FollowsVacationsCard.css";
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, grey, red } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import { Globals } from "../../../Services/GlobalsUrl";
import { changeDateFormat, userIsLoggedOut } from "../../../Services/GlobalFunctions";
import store from "../../../Redux/Store";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Axios from "axios";
import { vacationUpdatedAction } from "../../../Redux/VacationsState";
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import { useHistory } from "react-router-dom";
import { errorsService } from "../../../Services/GlobalErrorsMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
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
    circleIcon: {
        fontSize: 'large',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

interface FollowsVacationsCardProps {
    singleFollowsVacation: VacationsModel;
}
//card of users
function FollowsVacationsCard(props: FollowsVacationsCardProps): JSX.Element {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const history = useHistory();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //check if user follow of vacation
    let checkFollow = false;
    if (props.singleFollowsVacation.followers) {
        const res: string[] = props.singleFollowsVacation.followers.split(",");
        for (const item of res) {
            if (item === store.getState().usersState.user.userId.toString()) {
                checkFollow = true;
            }
        }
    }
    //if user choose fo button to follow
    async function followVacationAsync() {
        try {
            const myFormData = new FormData();
            myFormData.append("userId", (store.getState().usersState.user.userId).toString());
            myFormData.append("vacationId", (props.singleFollowsVacation.vacationId).toString());
            const response = await Axios.post<VacationsModel>(Globals.followUrl, myFormData);
            store.dispatch(vacationUpdatedAction(response.data));
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
    //if user choose fo button to unfollow
    async function unfollowVacationAsync() {
        try {
            const userId = store.getState().usersState.user.userId;
            const vacationId = props.singleFollowsVacation.vacationId;
            const response = await Axios.delete(Globals.followUrl + `${userId}/${vacationId}`);
            store.dispatch(vacationUpdatedAction(response.data));
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
    props.singleFollowsVacation.fromDate = changeDateFormat(props.singleFollowsVacation.fromDate);
    props.singleFollowsVacation.toDate = changeDateFormat(props.singleFollowsVacation.toDate);
    //Button if user follow to this vacation
    const followButton = <IconButton onClick={unfollowVacationAsync} aria-expanded={expanded} style={{ color: blue[600] }} aria-label="add to favorites">
        <ThumbUpAltOutlinedIcon />
    </IconButton>;
    //Button if user doesn't follow to this vacation
    const unFollowButton =
        <IconButton onClick={followVacationAsync} aria-expanded={expanded} aria-label="add to favorites">
            <ThumbUpAltOutlinedIcon />
        </IconButton>;
    return (
        <div className="FollowsVacationsCard">
            <Card className={classes.root}>
                <CardHeader
                    title={props.singleFollowsVacation.destination}
                />
                <CardMedia className={classes.media} title="Vacation Image"
                    image={Globals.vacationsUrl + "images/" + props.singleFollowsVacation.imageFileName}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        From Date: {props.singleFollowsVacation.fromDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        To Date: {props.singleFollowsVacation.toDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: {props.singleFollowsVacation.price}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/* Check if this user follow of this vacation */}
                    {checkFollow ? followButton : unFollowButton}
                    <IconButton aria-expanded={expanded} aria-label="add to favorites">
                        <RadioButtonUncheckedRoundedIcon fontSize="large" />
                        <Typography variant="body2" color="textSecondary" component="p" className="followsNumber">
                            {props.singleFollowsVacation.countFollows ? props.singleFollowsVacation.countFollows : 0}
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
                            {props.singleFollowsVacation.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div >

    );
}

export default FollowsVacationsCard;