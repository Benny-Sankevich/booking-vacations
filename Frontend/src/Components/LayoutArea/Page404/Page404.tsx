import React from "react";
import "./Page404.css";
import errorImage from "../../../assets/images/Error404.png";
//Image of error page 404
function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <img alt="errorImage" src={errorImage} />
        </div>
    );
}

export default Page404;