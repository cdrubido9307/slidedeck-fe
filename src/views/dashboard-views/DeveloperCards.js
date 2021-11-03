// Import CSS
// Import major dependencies
import React from "react";
// Import components
import Card from "../../components/Card";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import ThemeSwitcher from "../../components/ThemeSwitcher";
// Import icons
import { IoIosAirplane } from "react-icons/io";
import { FaThumbsUp, FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content
import storage from "../../static/storage";

const DeveloperCards = (props) => {

    const clearLocalStorage = () => {
        storage.removeAll();
    }

    return (
        <>
            <Card>
                <ThemeSwitcher/>
                <div className="h-4"/>
                <ButtonGroup buttons={[
                    <Button icon={FaRegClock}>Recent Logs</Button>,
                    <Button icon={CgMenuGridR}>Browse Logs</Button>,
                    <Button icon={HiPlus}>New Log</Button>
                ]}/>
                <div className="h-4"/>
                <Button 
                    icon={IoIosAirplane}
                >
                    Browse All Logs
                </Button>
                <div className="h-4"/>
                <Button 
                    onClick={clearLocalStorage}
                    icon={FaThumbsUp}
                >
                    Clear localStorage
                </Button>
            </Card>

            

            {/* <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card> */}
        </>
    )
}

export default DeveloperCards;