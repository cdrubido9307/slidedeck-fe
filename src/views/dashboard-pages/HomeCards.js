// Import CSS
// Import major dependencies
import React from "react";
// Import components
import Page from "../../components/Page";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import FileBrowser from "../../components/FileBrowser";
// Import icons
import { IoIosAirplane } from "react-icons/io";
import { FaThumbsUp, FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content

const HomeCards = (props) => {

    const testFiles = [
        {
            name: "testing testing hello world",
            type: "log"
        }, {
            name: "lorem ipsum Dolor",
            type: "log"
        }, {
            name: "Sit amet",
            type: "log"
        }, {
            name: "testing testing hello world asd asdasd",
            type: "log"
        }, {
            name: "lorem ipsum Dolor",
            type: "log"
        }, {
            name: "Sit amet",
            type: "log"
        }, {
            name: "testing testing hello world asd asdasd",
            type: "log"
        }, {
            name: "asdasdasdasdasdas",
            type: "log"
        }
    ]

    return (
        <>
            <Page>
                <ButtonGroup buttons={[
                    <Button icon={FaRegClock}>Recent Logs</Button>,
                    <Button icon={CgMenuGridR}>Browse Logs</Button>,
                    <Button icon={HiPlus}>New Log</Button>
                ]}/>
                <div className="h-4"/>
                <FileBrowser files={testFiles}/>
                <div className="h-4"/>
                <p className="text-lg font-bold">See logs you've been working on</p>
                <div className="h-4"/>
                <div className="backdrop">
                    <div className="flex items-center">
                        <FaThumbsUp className="h-4 w-4 mr-2 text-gray-400"/>
                        <div className="ml-2 pl-4 border-l-2">
                            <p>Nothing to see here...</p>
                            <p className="subtitle">
                                No recent logs
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-4"/>
                <Button 
                    icon={IoIosAirplane}
                >
                    Browse All Logs
                </Button>
            </Page>



            {/* <Card>
                <p>This is a another test card</p>
            </Card> */}
        </>
    )
}

export default HomeCards;