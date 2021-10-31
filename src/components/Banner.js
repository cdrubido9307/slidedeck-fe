// Import CSS
// Import major dependencies
import React from "react";
// Import components
// Import icons
import { MdError } from "react-icons/md";
// Import API and static content

const Banner = (props) => {

    let classes = `
        transition-all
        w-full
        flex
        justify-center
        items-center
        relative
        z-40
        bg-red-500
        text-white
        h-10
        -mb-10
        shadow-lg
        transform
    `;

    if (props.show) {
        classes = `${classes} opacity-100 translate-y-0`
    } else {
        classes = `${classes} opacity-0 -translate-y-10`
    }

    return (
        <div className={classes}>
            <div className="text-current mr-2">
                <div className="bg-white bg-opacity-25 h-5 w-5 -mb-5 rounded-full animate-ping"/>
                <MdError className="h-5 w-5"/>
            </div>
            {props.children}
        </div>
    )
}

export default Banner;