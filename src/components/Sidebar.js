// Import CSS
import "./css/Sidebar.css";
// Import major dependencies
import React, { useContext, useRef, useState } from 'react';
// Import components
import { DashboardContext } from "../views/Dashboard";
import FX from './FX';
// Import icons
import { FaChevronRight } from "react-icons/fa";

const Sidebar = (props) => {
    
    const dashboardContext = useContext(DashboardContext)
    const [ripple, setRipple] = useState(FX.Ripple.util.defaultState());
    const ref = useRef();
    const onMouseDown = (e) => {
        setRipple(FX.Ripple.util.startState(e, ref));
    }
    const onMouseUp = (e) => {
        setRipple(FX.Ripple.util.stopState(e, ref));
    }
    const toggleSidebar = () => {
        dashboardContext.setState((state) => {
            const newState = { ...state };
            newState.sidebarShow = !state.sidebarShow;
            return newState;
        });
    }
    return (
        <div className={"sidebar " + (props.show ?  "open" : "closed")}>
            {/* Blue corner */}
            <div className="sidebar-logo">
                <button 
                    className="toggle-button"
                    title={props.show ? "hide sidebar" : "show sidebar"}
                    onClick={toggleSidebar} 
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    ref={ref}
                >
                    <FX.Ripple.Component state={ripple}/>
                    <FaChevronRight className="chevron"/>
                    <img alt="Slidedeck logo" src="assets/slidedeck-icon.svg"/>
                </button>
                <div className="sidebar-logo-type">
                    <img alt="Slidedeck logo" src="assets/slidedeck-type.svg"/>
                </div>
            </div>
            {props.children}
        </div>
    )

}

export default Sidebar;