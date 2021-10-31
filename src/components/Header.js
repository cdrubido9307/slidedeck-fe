// Import CSS
import './css/Header.css';
// Import major dependencies
import React from "react";
// Import components
import Button from "./Button";
import TextBox from "./TextBox";
import ThemeSwitcher from "./ThemeSwitcher";
// Import icons
import { FaSearch } from "react-icons/fa";
// Import API and static content

const Header = (props) => {

    return(
        <div className="header">
            <div className="header-content">
                <ThemeSwitcher/>
                <TextBox icon={FaSearch} placeholder="Search..."/>
                <Button icon={FaSearch}>
                    Test Button
                </Button>
            </div>
        </div>
    )
    
}

export default Header;