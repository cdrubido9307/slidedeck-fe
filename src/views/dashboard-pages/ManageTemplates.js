// Import CSS
import "./css/ManageTemplates.css";
// Import major dependencies
import React, { useContext, useEffect, useState } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import FileBrowser from "../../components/FileBrowser";
import Header from "../../components/Header";
import Auth from "../../components/Auth";
// import TextBox from "../../components/TextBox";
import NewTemplate from "../../components/NewTemplate";
import Dashboard from "../../views/Dashboard";
// Import icons
import { FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content
import api from "../../static/api";
import storage from "../../static/storage";
import parsePath from "../../static/parsePath";

const templatePages = [
    {name: "recent"},
    {name: "all"},
    {name: "new"},
]

const setUpDefaultState = (DashboardContext) => {
    const defaultState = {
        i: 0,
        name: templatePages[0].name
    }
    const pathSplit = parsePath.toArray(DashboardContext.state.path);
    if (pathSplit.length > 2) {
        for (let i = 0; i < templatePages.length; i++) {
            if (pathSplit[2] === templatePages[i].name) {
                defaultState.i = i;
                defaultState.name = templatePages[i].name
                break;
            }
        }
    }
    return defaultState;
}

const ManageTemplates = (props) => {

    const AuthContext = useContext(Auth.Context);
    const DashboardContext = useContext(Dashboard.Context);

    const [files, setFiles] = useState([]);
    const [pageState, setPageState] = useState(setUpDefaultState(DashboardContext));

    const changeTemplatePage = (i) => {
        const pathSplit = parsePath.toArray(DashboardContext.state.path);
        const newPathSplit = pathSplit.slice(0, 2); newPathSplit.push(templatePages[i].name);
        const newPath = parsePath.toString(newPathSplit);
        const newPageState = {
            i: i,
            name: templatePages[i].name
        }
        setPageState(newPageState);
        DashboardContext.setState((state) => {
            const newState = { ...state };
            newState.path = newPath;
            return newState;
        })
    }
    const getFiles = (get) => {
        if (AuthContext.user.loggedIn) {
            if (get === "recent") {
                const recentFiles = storage.get("recent-templates");
                setFiles(recentFiles ? recentFiles : []);
            }
            if (get === "all") {
                api.get_template(AuthContext.user.token, onSuccess);
            }
        } else {
            console.log("USER LOGGED OUT");
        }
    }
    const onSuccess = (data) => {
        console.log("GET result", data);
        setFiles(data.result);
    }
    
    useEffect(() => {
        // console.log(pageState);
        getFiles(pageState.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState])
    
    let pageContent;
    switch (pageState.name) {
        case "recent":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Your Most Recent Templates</p>
                    <div className="h-4"/>
                    <FileBrowser files={[]}/>
                </>
            break;
        case "all":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Browse All Templates</p>
                    <div className="h-4"/>
                    <FileBrowser files={files}/>
                </>
            break;
        case "new":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Create a New Template</p>
                    <div className="h-4"/>
                    {/* <TextBox type="text" placeholder="New Template Name"/> */}
                    <NewTemplate type="template"/>
                </>
            break;
        default:
            pageContent = <></>
            break;
    }

    return (
        <>
            <Header>
                <ButtonGroup active={pageState.i} buttons={[
                    <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Templates</Button>,
                    <Button onClick={() => {changeTemplatePage(1)}} icon={CgMenuGridR}>All Templates</Button>,
                    <Button onClick={() => {changeTemplatePage(2)}} icon={HiPlus}>New Template</Button>
                ]}/>
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageTemplates;