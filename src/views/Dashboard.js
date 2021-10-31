// Import CSS
import "./css/Dashboard.css";
// Import major dependencies
import React, { createContext, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import { Helmet } from 'react-helmet-async';
import Card from "../components/Card";
// Import components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/SidebarItems";
import HomeCards from "./dashboard-views/HomeCards";
import DeveloperCards from "./dashboard-views/DeveloperCards";
// Import icons
// Import API and static content
import dashboardItems from "../static/dashboardItems";
import storage from "../static/storage";
// import storage from "../static/storage";

export const DashboardContext = createContext();

const Dashboard = (props) => {
    
    const defaultState = {
        active: {
            i: 0,
            title: dashboardItems[0].title
        },
        sidebarShow: true,
        sidebarOpenWidth: "18rem",
        sidebarClosedWidth: "5rem",
        headerHeight: "6.25rem"
    }
    const [dashboardState, setDashboardState] = useState(storage.get("dashboard") === undefined ? defaultState : storage.get("dashboard"));
    const [dashboardContent, setDashboardContent] = useState(<></>);
    // Update CSS variables to resize sidebar
    const updateCSSProps = () => {
        let __sidebar_open_w = dashboardState.sidebarOpenWidth;
        let __sidebar_closed_w = dashboardState.sidebarClosedWidth;
        let __sidebar_w = dashboardState.sidebarShow ? __sidebar_open_w : __sidebar_closed_w;
        let __header_h = dashboardState.headerHeight;
        document
            .documentElement
            .style
            .setProperty("--sidebar-open-w", __sidebar_open_w);
        document
            .documentElement
            .style
            .setProperty("--sidebar-closed-w", __sidebar_closed_w);
        document
            .documentElement
            .style
            .setProperty("--sidebar-w", __sidebar_w);
        document
            .documentElement
            .style
            .setProperty("--header-h", __header_h);
    }
    // Update dashboard content based on unique title
    const updateDashboardContent = (title) => {
        switch (title) {
            case "Home":
                setDashboardContent(<HomeCards/>);
                break;
            case "Developer Area":
                setDashboardContent(<DeveloperCards/>);
                break;
            default:
                setDashboardContent(<Card>{title}</Card>);
                break;
        }
    }
    // Call appropriate update functions when main state changes
    useEffect(() => {
        updateDashboardContent(dashboardState.active.title);
        updateCSSProps();
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
                    <div className="space-y-2">
                        {dashboardItems.map((item, i) => {return(
                            <SidebarItem 
                                active={i === dashboardState.active.i}
                                setDashboardState={setDashboardState}
                                key={i}
                                index={i}
                                title={item.title}
                                icon={item.icon}
                            ></SidebarItem>
                        )})}
                    </div>
                </Sidebar>
                {/* End sidebar */}
                {/* Main content */}
                <div className="flex-grow">
                    <Header/>
                    <div className="dashboard-flex-content">
                        {dashboardContent}
                    </div>
                </div>
                {/* End main content */}
            </div>
        </DashboardContext.Provider>
            
    )
}

export default Dashboard;