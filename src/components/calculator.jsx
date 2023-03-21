import React, {useEffect, useRef} from 'react';
import "../styles/calculator.scss"
import {useDispatch, useSelector} from "react-redux";

const Calculator = () => {

    const calculatorRef = useRef()

    const dispatch = useDispatch()
    const calculator = useSelector(state => state.calculator)
    const currentCard = useSelector(state => state.currentCard)


    useEffect(() => {
        console.log(calculator)
        if (calculator.length !== 0) {
            calculator.map(card => calculatorRef.current.append(card.card.current))
        } else {
            document.querySelector(".calculator").classList.remove("clearBoard")
        }
    }, [calculator])


    const dragOverFrameHandler = (e) => {
        e.preventDefault()
        document.querySelector(".calculator").classList.add("activeBoard")
    }

    const dragLeaveFrameHandler = (e) => {
        document.querySelector(".calculator").classList.remove("activeBoard")
    }

    const dropFrameHandler = (e) => {
        e.preventDefault()
        dispatch({type: "deleteCalculatorCard", payload: currentCard.id})
        dispatch({type: "addCalculatorCard", payload: currentCard})
        document.querySelector(".calculator").classList.add("clearBoard")
        document.querySelector(".calculator").classList.remove("activeBoard")
        dispatch({type: "takeCard", payload: null})
    }


    return (
        <div
            ref={calculatorRef}
            className="calculator"
            onDragOver={calculator.length < 4 ? e => dragOverFrameHandler(e) : e => {}}
            onDragLeave={calculator.length < 4 ? e => dragLeaveFrameHandler(e) : e => {}}
            onDrop={calculator.length < 4 ? e => dropFrameHandler(e) : e => {}}
        >
            <div className="frame">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7778 1V5.44444" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 3.22222L16.5556 3.22222" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12.3889 3.22222H5C2.79086 3.22222 1 5.01309 1 7.22223V16.2778M18.7778 9.61111V17C18.7778 19.2091 16.9869 21 14.7778 21H5C2.79086 21 1 19.2091 1 17V16.2778M1 16.2778L4.83824 12.4395C6.40034 10.8774 8.93298 10.8774 10.4951 12.4395C11.8961 13.8406 13.5664 15.5108 14.8889 16.8333" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.7778 14.6111L18.2729 14.1062C16.7108 12.5441 14.1781 12.5441 12.616 14.1062L12.3889 14.3333" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12.1111" cy="7.66667" r="0.555556" fill="black"/>
                </svg>
                <p className="firstText">Перетащите сюда</p>
                <p className="secondText">любой элемент<br/>из левой панели</p>
            </div>
        </div>
    );
};

export default Calculator;