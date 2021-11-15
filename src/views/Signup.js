// Import major dependencies
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// Import components
import Banner from "../components/Banner";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import LoadSpinner from "../components/LoadSpinner";
import Auth from "../components/Auth";
// Import icons
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaLock, FaChevronRight } from "react-icons/fa";
// Import API
import api from "../static/api";
// Import signature box
import SignaturePad from "react-signature-canvas";

const Signup = (props) => {

    let signature = useRef({});
    const [userSignature, setUserSignature] = useState(null)

    const saveSignature = ()=> {
        setUserSignature(signature.current.toData());
    }
    console.log(userSignature);
    return (
        <>  
            <Helmet>
                <title>Welcome</title>
            </Helmet>
            <Banner>
                Invalid username and/or password. Please try again.
            </Banner>
            <div className="auth-background">
                <div className="auth-card">
                    <div className="h-12"/>
                    <div className="flex justify-center">
                        <img 
                            alt="Slidedeck logo"
                            src="/assets/slidedeck-logo.svg" 
                            className="w-52 light-logo"
                        />
                        <img 
                            alt="Slidedeck logo"
                            src="/assets/slidedeck-logo-w.svg" 
                            className="w-52 dark-logo"
                        />
                    </div>
                    <div className="h-12"/>
                    <div className="h-4"/>
                    <TextBox 
                        icon={BsFillPersonLinesFill}
                        className="w-full"
                        type="text"
                        placeholder="Full Name" 
                    />
                    <div className="h-4"/>
                    <TextBox 
                        icon={MdEmail}
                        className="w-full"
                        type="text"
                        placeholder="Email" 
                    />
                    <div className="h-4"/>
                    <TextBox 
                        icon={FaUserAlt}
                        className="w-full"
                        type="text"
                        placeholder="Username" 
                    />
                    <div className="h-4"/>
                    <TextBox 
                        icon={FaLock}
                        className="w-full"
                        type="password"
                        placeholder="Password" 
                    />
                    <div className="h-4"/>
                    <TextBox 
                        icon={FaLock}
                        className="w-full"
                        type="password"
                        placeholder="Confirm Password" 
                    />
                    <div className="h-4" />
                    <SignaturePad
                    ref={signature}
                    penColor="blue" 
                    canvasProps={{width: 290, height: 200, 
                    className: "sigCanvas bg-gray-300"}} />
                    <div className="h-6"/>
                        <Button id="login"
                            onClick={saveSignature}
                            className="special center w-full font-bold" 
                            icon={FaChevronRight}>
                            SIGN UP
                        </Button>
                    <div className="h-4"/>
                </div>
            </div>
        </>
    );
}

export default Signup;