// Import CSS
import './App.css';
// Import major dependencies
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async';
// Import components
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Theme from './components/Theme';
import Auth from './components/Auth';
// Import icons
// Import API and static content

const App = () => {

    return(
        <HelmetProvider>
            <Auth.Provider>
                <Theme.Provider theme={Theme.list[1]}>
                    <div className="App"> 
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/login"/>
                                </Route>
                                <Route exact path="/login">
                                    <Login/>
                                </Route>
                                <Route exact path="/dashboard">
                                    <Redirect to="/dashboard/home"/>
                                </Route>
                                <Route exact path="/dashboard/home">
                                    <Dashboard.Page path="/dashboard/home"/>
                                </Route>
                                <Route exact path="/dashboard/new">
                                    <Dashboard.Page path="/dashboard/new"/>
                                </Route>
                                <Route exact path="/dashboard/logs">
                                    <Dashboard.Page path="/dashboard/logs"/>
                                </Route>
                                <Route exact path="/dashboard/templates">
                                    <Dashboard.Page path="/dashboard/templates"/>
                                </Route>
                                <Route exact path="/dashboard/reports">
                                    <Dashboard.Page path="/dashboard/reports"/>
                                </Route>
                                <Route exact path="/dashboard/dev">
                                    <Dashboard.Page path="/dashboard/dev"/>
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </Theme.Provider>   
            </Auth.Provider>
        </HelmetProvider>
    )
}

export default App;
