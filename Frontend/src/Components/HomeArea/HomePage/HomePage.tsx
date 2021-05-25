import React from "react";
import "./HomePage.css";
import profilePicture from "../../../assets/images/Benny.jpg";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

//Home page
function HomePage(): JSX.Element {

    return (
        <div className="HomePage">

            <h1>Welcome To Vacation Website.</h1>

            <p>This Website use the functions list below:</p>

            <li>NodeJs</li>
            <li>MySQL</li>
            <li>React JS</li>
            <li>Socket.IO</li>

            <p>Benny Sankevich.<br />
            Phone Number: 0508889169.</p>

            <img alt="errorImage" src={profilePicture} />

            <p><a className="Linkedin" href="https://www.linkedin.com/in/benny-sankevich"><LinkedInIcon /></a>
                <a href="mailto:Bennysankevich@gmail.com"><EmailTwoToneIcon /></a></p>
        </div>
    );
}

export default HomePage;
