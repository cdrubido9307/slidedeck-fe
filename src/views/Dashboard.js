// Import CSS
import "./css/Dashboard.css";
// Import major dependencies
import React, { createContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Page from "../components/Page";
// Import components
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/SidebarItems";
// import HomeCards from "./dashboard-pages/HomeCards";
import DeveloperCards from "./dashboard-pages/DeveloperCards";
// import Auth from "../components/Auth";
import ManageLogs from "./dashboard-pages/ManageLogs";
import ManageTemplates from "./dashboard-pages/ManageTemplates";
// Import icons
// Import API and static content
import dashboardItems from "../static/dashboardItems";
import storage from "../static/storage";
// import storage from "../static/storage";

const DashboardContext = createContext();

const DashboardPage = (props) => {
    
    // const AuthContext = useContext(Auth.Context);
    const defaultState = {
        active: {
            i: 0,
            title: dashboardItems[0].title,
        },
        path: props.path ? props.path : "/dashboard/home",
        sidebarShow: true
    }
    const lastState = storage.get("dashboard");
    if (props.path) {
        let active = -1;
        for (let i = 0; i < dashboardItems.length; i++) {
            if ("/dashboard" + dashboardItems[i].path === props.path) {
                active = i;
                break;
            }
        }
        if (lastState) {
            lastState.path = props.path;
            lastState.active.i = active;
            lastState.active.title = dashboardItems[active].title;
        }
        defaultState.path = props.path;
        defaultState.active.i = active;
        defaultState.active.title = dashboardItems[active].title;
    }
    const [dashboardState, setDashboardState] = useState(lastState ? lastState : defaultState);
    const [dashboardContent, setDashboardContent] = useState(<></>);
    // Update dashboard content based on unique path
    const updateDashboard = (state) => {
        switch (state.path) {
            case "/dashboard/logs":
                setDashboardContent(<ManageLogs/>);
                break;
            case "/dashboard/templates":
                setDashboardContent(<ManageTemplates/>);
                break;
            case "/dashboard/dev":
                setDashboardContent(<DeveloperCards/>);
                break;
            default:
                setDashboardContent(<Page>{state.active.title}</Page>);
                break;
        }
    }
    // Call appropriate update functions when main state changes
    useEffect(() => {
        // console.log(AuthContext.user);
        // console.log(dashboardState.path);
        updateDashboard(dashboardState);
        storage.set("dashboard", dashboardState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardState])

    return (
        <DashboardContext.Provider value={{
            state: dashboardState,
            setState: setDashboardState
        }}>
            <Helmet>
                <title>
                    {dashboardState.active.title}
                </title>
            </Helmet>
            <div className={"dashboard" + (dashboardState.sidebarShow ? " show-sidebar" : "")}>
                {/* Sidebar */}
                <Sidebar show={dashboardState.sidebarShow}>
                    <div className="space-y-4">
                        {dashboardItems.map((item, i) => {return(
                            <SidebarItem 
                                active={i === dashboardState.active.i}
                                key={i}
                                index={i}
                                title={item.title}
                                icon={item.icon}
                                path={item.path}
                            ></SidebarItem>
                        )})}
                    </div>
                </Sidebar>
                {/* End sidebar */}
                {/* Main content */}
                <div className="flex-grow">
                    <div className="dashboard-main-content">
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>
            
    )
}

const Dashboard = {
    Page: DashboardPage,
    Context: DashboardContext
}

export default Dashboard;