// Import CSS
import "./css/TextBox.css";
// Import major dependencies
import React, { useState } from "react";
// Import components
// Import icons
// Import API

const TextBox = (props) => {

    const [focus, setFocus] = useState(false);

    const onFocus = () => {
        setFocus(true);
        if (props.onFocus) props.onFocus();
    }

    const onBlur = () => {
        setFocus(false);
        if (props.onBlur) props.onBlur();
    }

    let className = "text-box " + props.className;
    if (props.icon) {
        className = "has-icon " + className;
    }

    return (
        <div className="text-box-wrapper">  
            <input
                value={props.value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={props.onChange}
                type={props.type}
                placeholder={props.placeholder} 
                className={className}
            />
            {props.icon &&
                <div className={`icon ${focus ? "focus": ""}`}>
                    <props.icon/>
                </div>
            }
        </div>
    )

}

export default TextBox;