// Import CSS
import './css/SidebarItem.css';
// Import major dependencies
import React, { useRef, useState } from 'react';
// Import components
import FX from './FX';
// Import icons
// Import API and static content

const SidebarItem = (props) => {

    // For Ripple FX
    const [ripple, setRipple] = useState(FX.Ripple.util.defaultState());
    const buttonRef = useRef();
    const onMouseDown = (e) => {
        setRipple(FX.Ripple.util.startState(e, buttonRef));
    }
    const onMouseUp = (e) => {
        setRipple(FX.Ripple.util.stopState(e, buttonRef));
    }
    // End Ripple FX
    const changeDashboardPage = () => {
        props.setDashboardState((state) => {
            const newState = { ...state };
            newState.active.i = props.index;
            newState.active.title = props.title;
            return newState;
        })
    }

    return (
        <div className="sidebar-item-wrapper">  
            <div className="sidebar-tooltip">
                <p>{props.title}</p>
            </div>
            <button 
                className={"sidebar-item" + (props.active ? " active" : "")} 
                onClick={changeDashboardPage}
                title={props.title}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                ref={buttonRef}
            >
                <FX.Ripple.Component state={ripple}/>
                <div className="sidebar-item-icon">
                    <props.icon className="h-5 w-5"/>
                </div>
                <p className="whitespace-nowrap">
                    {props.title}
                </p>
            </button>
        </div>
    )

}

export default SidebarItem;