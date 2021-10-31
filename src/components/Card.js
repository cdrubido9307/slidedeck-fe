// Import CSS
import "./css/Card.css";
// Import major dependencies
import React from "react";
// Import components
// Import icons
// Import API and static content

const Card = (props) => {

    return(
        <div className="card">
            {props.children}
        </div>
    )

}

export default Card;