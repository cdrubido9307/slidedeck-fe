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

const DeveloperCards = (props) => {
    return (
        <>
            <Card>
                <ThemeSwitcher/>
                <div className="h-5"/>
                <ButtonGroup buttons={[
                    <Button icon={FaRegClock}>Recent Logs</Button>,
                    <Button icon={CgMenuGridR}>Browse Logs</Button>,
                    <Button icon={HiPlus}>New Log</Button>
                ]}/>
                <div className="h-5"/>
                <p className="text-lg font-bold">See logs you've been working on</p>
                <div className="h-5"/>

                <div className="bg-gray-500 bg-opacity-5 p-5 rounded">
                    <div className="flex items-center">
                        <FaThumbsUp className="h-4 w-4 mr-2 text-gray-400"/>
                        <div className="ml-2 pl-4 border-l-2 border-gray-200">
                            <p>Nothing to see here...</p>
                            <p className="subtitle">
                                No recent logs
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-5"/>
                <Button 
                    icon={IoIosAirplane}
                >
                    Browse All Logs
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