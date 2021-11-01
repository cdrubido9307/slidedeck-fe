// Import CSS
import "./css/FileBrowser.css";
// Import major dependencies
import React from "react";
// Import components
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import FileIcon from "./FileIcon";
// Import icons
import { RiListCheck2, RiListCheck } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";
// Import API and static content

const BrowserPath = (props) => {
    const tokens = props.path.split("/");
    const fullPath = [];
    for (let i = 0; i < tokens.length; i++) {
        const directory = <p className="directory subtitle">{tokens[i]}</p>;
        const separator = <MdArrowRight className="slash"/>
        fullPath.push(directory);
        if (i < tokens.length-1) fullPath.push(separator);
    }
    return(
        <div className="path-wrapper">{fullPath}</div>
    )
}

const FileBrowser = (props) => {

    return(
        <div className="file-browser">
            <div className="browser-header">
                <p>View as</p>
                <ButtonGroup buttons={[
                    <Button icon={RiListCheck2}>Icons</Button>,
                    <Button icon={RiListCheck}>List</Button>
                ]}/>
                <p>Sort by</p>
                <Button icon={FaChevronDown}>Date Created</Button>
            </div>
            <div className="preview-box">
                {props.files.map((file, i) => {return(
                    <FileIcon file={file} key={i}/>
                )})}
            </div>
            <div className="browser-path">
                <BrowserPath path="root/user/recents/logs"/>
            </div>
        </div>
    )

}

export default FileBrowser;