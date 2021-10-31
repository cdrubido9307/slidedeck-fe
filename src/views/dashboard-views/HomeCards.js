// Import CSS
// Import major dependencies
import React from "react";
// Import components
import Card from "../../components/Card";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
// Import icons
import { IoIosAirplane } from "react-icons/io";
import { FaThumbsUp, FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content

const HomeCards = (props) => {
    return (
        <>
            <Card>
                <ButtonGroup buttons={[
                    <Button icon={FaRegClock}>Recent Logs</Button>,
                    <Button icon={CgMenuGridR}>Browse Logs</Button>,
                    <Button icon={HiPlus}>New Log</Button>
                ]}/>
                <div className="h-5"/>
                <p className="text-lg font-bold">See logs you've been working on</p>
                <div className="h-5"/>

                <div className="backdrop">
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



            {/* <Card>
                <p>This is a another test card</p>
            </Card> */}
        </>
    )
}

export default HomeCards;