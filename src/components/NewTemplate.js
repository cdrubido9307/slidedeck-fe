// Import CSS
import "./css/NewTemplate.css";
// Import major dependencies
import React, { useContext, useEffect, useState } from "react";
// Import components
import TextBox from "./TextBox";
import Auth from "./Auth";
import LoadSpinner from "./LoadSpinner";
// Import icons
// Import API and static content
import api from "../static/api";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

const ColumnGroup = (props) => {

    const columns = [];

    const Column = (props) => {
        return (
            <div className="col">
                <p className="col-heading">#{props.index+1}</p>
                <p className="col-name">Ipsum dolor sit amet</p>
            </div>
        )
    }

    for (let i = 0; i < 4; i++) {
        columns.push(<Column key={i} index={i}/>);
    }

    return (
        <div className="col-group">
            <div className="col-group-header">
                <Button>x</Button>
                <div className="flex-grow"/>
                <span>
                    <p className="col-group-title">To be completed by</p>
                    <ButtonGroup buttons={[
                        <Button>Technician</Button>,
                        <Button>Pathologist</Button>
                    ]}/>
                </span>
                <div className="flex-grow"/>
                <div className="w-8"/>
            </div>
            <div className="bracket">
                <div className="left"/>
                <div className="extension"/>
                <div className="center"/>
                <div className="extension"/>
                <div className="right"/>
            </div>
            <div className="columns">
                {columns}
                {/* <div className="col">
                    <p>Ipsum dolor sit amet</p>
                </div>
                <div className="col">
                    <p>Name one lorem</p>
                </div>
                <div className="col">
                    <p>Ipsum dolor sit amet</p>
                </div>
                <div className="col">
                    <p>Ipsum dolor sit amet</p>
                </div>
                <div className="col">
                    <p>Ipsum dolor sit amet</p>
                </div>
                <div className="col">
                    <p>Ipsum dolor sit amet</p>
                </div> */}
            </div>
        </div>
    )
}

const NewTemplate = (props) => {

    const AuthContext = useContext(Auth.Context);
    // const type = props.type ? props.type : "log";
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState("New Template");
    
    const appendFileNum = (data) => {
        setFileName((name) => {
            const newName = `${name} ${data.result.length}`;
            return newName;
        });
        setLoading(false);
    }
    const updateFileName = (e) => {
        const value = e.target.value;
        setFileName(value);
    }
    // Init
    useEffect(() => {
        api.get_template(AuthContext.user.token, appendFileNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="backdrop new-template">
            <div className="backdrop-header">
                <span>
                    <p>Template Name</p>
                    <TextBox 
                        value={fileName} 
                        onChange={updateFileName}
                        type="text" 
                        placeholder="New Name"
                        className="w-64"
                    />
                </span>
                <div className="flex-grow"/>
                {loading && <LoadSpinner/>}
            </div>
            <div className="template-editor">
                <div className="group-blocks">
                    <ColumnGroup/>
                    <ColumnGroup/>
                </div>
            </div>
        </div>
    )

}

export default NewTemplate;