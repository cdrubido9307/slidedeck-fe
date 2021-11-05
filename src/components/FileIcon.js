// Import CSS
import "./css/FileIcon.css"
// Import major dependencies
import React from "react";
// Import components
// Import icons
// import { ImTable } from "react-icons/im";
// Import API and static content

// const truncate = (string, max) => {
//     // console.log(string, string.length);
//     // return string;
//     let short = "";
//     let hasSpace = false;
//     for (let i = 0; i < string.length; i++) {
//         if (string[i] === " ") {
//             hasSpace = true;
//             break;
//         }
//     }
//     if (hasSpace) {
//         // return string;
//         if (string.length > max) {
//             let foundSpace = false;
//             let startCopy = false;
//             for (let i = max-1; i >= 0; i--) {
//                 if (string[i] === " " && !foundSpace) foundSpace = true;
//                 if (foundSpace && string[i] !== " " && !startCopy) startCopy = true;
//                 if (startCopy) short = string[i] + short;
//             }
//             return short + " ...";
//         } else {
//             return string;
//         }
//     } else {
//         if (string.length > Math.floor(0.33 * max)) {
//             short = string.substring(0, Math.floor(0.33 * max));
//             return short + " ...";
//         } else {
//             return string;
//         }
//     }
    
// }

const FileIcon = (props) => {

    return(
        <div className="file-icon log">
            {/* <div className="icon">
                <p className="file-size"></p>
                <p className="file-type">LOG</p>
            </div> */}
            <div className="icon">
                <img alt="Log file icon" src="/assets/log-file-icon.svg"/>
            </div>
            <div className="info">
                <p className="filename">
                    {/* {truncate(props.file.name, 32)} */}
                    {props.file.name}
                </p>
                <p className="subtitle">Last modified</p>
            </div>
        </div>
    )

}

export default FileIcon;