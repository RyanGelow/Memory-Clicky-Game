import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from './Pages/Main';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";

ReactDOM.render(

    <Router>
        <App>
            <Route exact path="/" component={Main} />
        </App>
    </Router>, 

document.getElementById("root"));
