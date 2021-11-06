// Import CSS
import "./css/FileBrowser.css";
// Import major dependencies
import React, { useState } from "react";
// Import components
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import FileIcon from "./FileIcon";
// Import icons
import { RiListCheck2, RiListCheck } from "react-icons/ri";
import { FaThumbsUp, FaChevronDown, FaChevronRight } from "react-icons/fa";
// Import API and static content

const BrowserPath = (props) => {
    const tokens = props.path.split("/");
    const fullPath = [];
    let key = 0;
    for (let i = 0; i < tokens.length; i++) {
        const suffix = props.fileCount === 1 ? "item" : "items";
        const count = i === tokens.length-1 ? `${tokens[i]}: ${props.fileCount} ${suffix}` : `${tokens[i]}`;
        const directory = <p key={key++} className="directory subtitle">{count}</p>;
        const separator = <FaChevronRight key={key++} className="slash"/>;
        fullPath.push(directory);
        if (i < tokens.length-1) fullPath.push(separator);
    }
    return (
        <div className="path-wrapper">{fullPath}</div>
    )
}

const EmptyMessage = () => {
    return (
        <div className="empty-message">
            <FaThumbsUp className="icon"/>
            <div className="divider"/>
            <div className="message">
                <p>Nothing to see here</p>
                <p className="subtitle">
                    No items in this location.
                </p>
            </div>
        </div>
    )
}

const FileBrowser = (props) => {

    const fileCount = props.files !== undefined ? props.files.length : 0;
    const [view, setView] = useState(0);

    return (
        <div className={"file-browser backdrop " + (view === 0 ? "icons" : "list")}>
            <div className="backdrop-header">
                <span>
                    <p>View as</p>
                    <ButtonGroup active={view} buttons={[
                        <Button 
                            icon={RiListCheck2}
                            onClick={() => {setView(0)}}
                        >Icons</Button>,
                        <Button 
                            icon={RiListCheck}
                            onClick={() => {setView(1)}}
                        >List</Button>
                    ]}/>
                </span>
                <span>
                    <p>Sort by</p>
                    <Button icon={FaChevronDown}>Date Created</Button>
                </span>
            </div>
            {(fileCount > 0) ? 
                <div className="preview-box">
                    {props.files.map((file, i) => {return(
                        <FileIcon file={file} key={i}/>
                    )})}
                </div>
                :
                <EmptyMessage/>
            }   
            <div className="browser-path">
                <BrowserPath path="root/user/recents/logs" fileCount={fileCount}/>
            </div>
        </div>
    )

}

export default FileBrowser;