import React from 'react';
import "../styles/constructor.scss"
import {useDispatch, useSelector} from "react-redux";

const Constructor = () => {

    const dispatch = useDispatch()
    const calculator = useSelector(state => state.calculator)

    const dragStartHandler = (e, id) => {
        dispatch({type: "takeCard", payload: id})
    }

    return (
        <div className="constructor">

            <div
                className="displayBar"
                style={(calculator.find(el => el.id === 0)) ? {background: "none", boxShadow: "none", opacity: "0.4", cursor: "auto"} : {}}
                draggable={!(calculator.find(el => el.id === 0))}
                onDragStart={e => dragStartHandler(e, 0)}
            >
                <div className="display">0</div>
            </div>

            <div
                className="operatorsBar"
                style={(calculator.find(el => el.id === 1)) ? {background: "none", boxShadow: "none", opacity: "0.4", cursor: "auto"} : {}}
                draggable={!(calculator.find(el => el.id === 1))}
                onDragStart={e => dragStartHandler(e, 1)}
            >
                <div className="operators">
                    <div>/</div>
                    <div>x</div>
                    <div>-</div>
                    <div>+</div>
                </div>
            </div>

            <div
                className="numbersBar"
                style={(calculator.find(el => el.id === 2)) ? {background: "none", boxShadow: "none", opacity: "0.4", cursor: "auto"} : {}}
                draggable={!(calculator.find(el => el.id === 2))}
                onDragStart={e => dragStartHandler(e, 2)}
            >
                <div className="numbers">
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div id="zero">0</div>
                    <div id="sign">,</div>
                </div>
            </div>

            <div
                className="equalsBar"
                style={(calculator.find(el => el.id === 3)) ? {background: "none", boxShadow: "none", opacity: "0.4", cursor: "auto"} : {}}
                draggable={!(calculator.find(el => el.id === 3))}
                onDragStart={e => dragStartHandler(e, 3)}
            >
                <div className="equals">=</div>
            </div>

        </div>
    );
};

export default Constructor;