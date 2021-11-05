// Import CSS
import "./css/Banner.css"
// Import major dependencies
import React from "react";
// Import components
// Import icons
import { MdError } from "react-icons/md";
// Import API and static content

const Banner = (props) => {

    return (
        <div className={"banner " + (props.show ? "show" : "hidden")}>
            <div className="text-current mr-2">
                <div className="bg-white bg-opacity-25 h-4 w-4 -mb-4 rounded-full animate-ping"/>
                <MdError className="h-4 w-4 text-white"/>
            </div>
            {props.children}
        </div>
    )
}

export default Banner;