// Import CSS
import "./css/NewLog.css";
// Import major dependencies
import React, { useContext, useState, useEffect } from "react";
// Import components
import FileBrowser from "./FileBrowser";
import TextBox from "./TextBox";
import Auth from "./Auth";
import LoadSpinner from "./LoadSpinner";
import Button from "./Button";
import Banner from "./Banner";
// Import icons
import { FaCheck } from "react-icons/fa";
// Import API and static content
import api from "../static/api";

const NewLog = (props) => {

    const AuthContext = useContext(Auth.Context);

    const [selectedTemplate, setSelectedTemplate] = useState(undefined);
    const [newLogName, setNewLogName] = useState("New Log");
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bannerShow, setBannerShow] = useState(false);
    const [bannerText, setBannerText] = useState("An error has occurred.");

    const updateFileName = (e) => {
        const value = e.target.value;
        setNewLogName(value);
    }

    const checkFileName = (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            setBannerText("Log name cannot be blank.");
            setBannerShow(true);
        }
        // setNewLogName(value);
    }

    const appendFileNum = (data) => {
        setLoading(false);
        // console.log(data);
        setNewLogName(`New Log ${data.result.length + 1}`);
    }

    const onTemplateClick = (file) => {
        // console.log(file);
        let columns = [];
        for (let header in file.headers) {
            // console.log(header);
            columns.push(header);
        }
        setSelectedTemplate(file);
        setColumns(columns);
    }

    const onNewLogSuccess = (data) => {
        // console.log(data);
        props.changeTemplatePage(1);
    }

    const submitNewLog = () => {
        if (!selectedTemplate) {
            setBannerText("No template selected.");
            setBannerShow(true);
        } else if (newLogName.length === 0) {
            setBannerText("Log name cannot be blank");
            setBannerShow(true);
        } else {
            const log = {
                template: selectedTemplate.id,
                name: newLogName,
                presets: [],
                token: AuthContext.user.token
            };
            api.post_log_create(log, onNewLogSuccess);
        }
    }

    useEffect(() => {
        api.get_log(AuthContext.user.token, appendFileNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="new-log">
            <div className="template-select backdrop">
                <div className="backdrop-header">
                    <p className="h-8 flex items-center">Select a template to be used by new log</p>
                    {loading && <LoadSpinner/>}
                </div>
                <div className="-mx-4">
                    <Banner 
                        dismiss={() => {setBannerShow(false)}} 
                        show={bannerShow}
                    >
                        {bannerText}
                    </Banner>
                </div>
                <div className="-mx-4 flex">
                    <div className="template-list">
                        <FileBrowser 
                            mini
                            onSelect={onTemplateClick}
                            view={1} 
                            from="all" 
                            type="template"
                        />
                    </div>
                    <div className="new-log-editor">
                        {!selectedTemplate ?
                            <div className="blank-message">
                                <p className="subtitle italic">
                                    No template selected
                                </p>
                            </div>
                        :
                            <div>
                                <div className="new-log-header truncate">
                                    <p>Creating</p>
                                    <div className="small-icon">L</div>
                                    <p className="truncate"><b>New Log</b> from</p>
                                    <div className="small-icon">T</div>
                                    <b className="truncate">{selectedTemplate.name}</b>
                                </div>

                                <div className="truncate flex items-center space-x-2 py-2 -my-2">
                                    <p className="truncate">New Log Name</p>
                                    <div className="flex-grow">
                                    <TextBox 
                                        readOnly={!AuthContext.user.loggedIn || loading}
                                        value={newLogName} 
                                        onChange={updateFileName}
                                        onBlur={checkFileName}
                                        type="text" 
                                        placeholder="New Log Name"
                                        className="w-full"
                                    />
                                    </div>
                                </div>
                                <div className="text-center my-4">
                                    <p className="subtitle">Chosen template has {columns.length} {columns.length == 1 ? "column" : "columns"}</p>
                                </div>
                                <div className="columns-preview">
                                    {columns.map((colName, i) => {return(
                                        <div key={i} className="template-col">
                                            <div className="col-name">
                                                <p className="truncate">{colName}</p>
                                            </div>
                                            <TextBox placeholder="Optional default value" className="w-full"/>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="backdrop-footer">
                    <Button onClick={submitNewLog} icon={FaCheck} className="special">Create New Log</Button>
                </div>
            </div>
        </div>
    )

}

export default NewLog;