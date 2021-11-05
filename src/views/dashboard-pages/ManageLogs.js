// Import CSS
import "./css/ManageLogs.css";
// Import major dependencies
import React, { useState } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
// Import icons
import { FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
import FileBrowser from "../../components/FileBrowser";
import Header from "../../components/Header";
// Import API and static content

const ManageLogs = (props) => {

    const testFiles = [
        {
            name: "testing testing hello world",
            type: "log"
        }, {
            name: "lorem ipsum Dolor",
            type: "log"
        }, {
            name: "Sit amet",
            type: "log"
        }, {
            name: "testing testing hello world asd asdasd",
            type: "log"
        }, {
            name: "lorem ipsum Dolor",
            type: "log"
        }, {
            name: "Sit amet",
            type: "log"
        }, {
            name: "testing testing hello world asd asdasd",
            type: "log"
        }, {
            name: "asdasdasdasdasdas",
            type: "log"
        }
    ];
    // const empty = [];

    const [pageState, setPageState] = useState(0);

    let pageContent;
    switch (pageState) {
        case 0:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Your Most Recent Logs</p>
                    <div className="h-4"/>
                    <FileBrowser files={testFiles}/>
                </>
            break;
        case 1:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Browse All Logs</p>
                    <div className="h-4"/>
                    <FileBrowser files={testFiles}/>
                </>
            break;
        case 2:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Create a New Log</p>
                </>
            break;
        default:
            pageContent = <></>
            break;
    }

    return (
        <>
            <Header>
                <ButtonGroup active={pageState} buttons={[
                    <Button onClick={() => {setPageState(0)}} icon={FaRegClock}>Recent Logs</Button>,
                    <Button onClick={() => {setPageState(1)}} icon={CgMenuGridR}>All Logs</Button>,
                    <Button onClick={() => {setPageState(2)}} icon={HiPlus}>New Log</Button>
                ]}/>
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageLogs;