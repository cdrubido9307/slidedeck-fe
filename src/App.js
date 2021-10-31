// Import CSS
import './App.css';
// Import major dependencies
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async';
// Import components
import Dashboard from './views/Dashboard';
import Authentication from './views/Auth';
import Theme from './components/Theme';
// Import icons
// Import API and static content

const App = () => {

    return(
        <HelmetProvider>
            <Theme.Provider theme={Theme.list[1]}>
                <div className="App"> 
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Authentication} />
                            <Route path="/dashboard" component={Dashboard} />  
                        </Switch>
                    </BrowserRouter>
                </div>
            </Theme.Provider>   
        </HelmetProvider>
    )
}

export default App;
