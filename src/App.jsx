import React from 'react';
import "./styles/app.scss"
import Switcher from "./components/switcher";
import Constructor from "./components/constructor";
import Calculator from "./components/calculator";
import Cards from "./components/cards";
import {useSelector} from "react-redux";


function App() {

    const constructorMode = useSelector(state => state.constructorMode)

    return (
        <div>

            {window.innerWidth > 400 ?
                <div className="app">
                    <div style={constructorMode ? {display: "flex"} : {display: "none"}}>
                        <Constructor/>
                    </div>
                    <div>
                        <Cards/>
                        <Switcher/>
                        <Calculator/>
                    </div>
                </div>
            :
                <div className="app">
                    <div>
                        <Cards/>
                        <Switcher/>
                        <Calculator/>
                    </div>
                    <div style={constructorMode ? {display: "flex"} : {display: "none"}}>
                        <Constructor/>
                    </div>
                </div>
            }

        </div>
    );
}

export default App;
