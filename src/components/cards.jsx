import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "../styles/cards.scss"

const Cards = () => {

    const displayRef = useRef()
    const operatorsRef = useRef()
    const numbersRef = useRef()
    const equalsRef = useRef()

    const dispatch = useDispatch()
    const calculatorCards = useSelector(state => state.calculatorCards)
    const currentCard = useSelector(state => state.currentCard)
    const calculator = useSelector(state => state.calculator)
    const constructorMode = useSelector(state => state.constructorMode)
    const result = useSelector(state => state.result)


    useEffect(() => {
        calculatorCards.push({id: 0, card: displayRef}, {id: 1, card: operatorsRef}, {id: 2, card: numbersRef}, {id: 3, card: equalsRef})
        console.log(calculatorCards)
    }, [])

    useEffect(() => {
        constructorMode ? document.querySelector(".calculator").classList.remove("hoverButton") : document.querySelector(".calculator").classList.add("hoverButton")
    }, [constructorMode])


    const dragStartHandler = (e, id) => {
        dispatch({type: "takeCard", payload: id})
    }

    const dragOverHandler = (e, card) => {
        e.preventDefault()
        if (currentCard.id === 0) {
            document.querySelector(".calculatorDisplayBar").classList.add("hoverLine")
        } else {
            document.querySelector(card).classList.add("hoverLine")
        }
    }

    const dragLeaveHandler = (e, card) => {
        if (currentCard.id === 0) {
            document.querySelector(".calculatorDisplayBar").classList.remove("hoverLine")
        } else {
            document.querySelector(card).classList.remove("hoverLine")
        }
    }

    const dropHandler = (e, id, card) => {
        e.preventDefault()
        const dropIndex = calculator.findIndex(el => el.id === id)
        const cardIndex = calculator.findIndex(el => el.id === currentCard.id)

        if (dropIndex === cardIndex) {
            dispatch({type: "deleteCalculatorCard", payload: currentCard.id})
            dispatch({type: "addUnderCalculatorCard", payload: dropIndex})
            document.querySelector(card).classList.remove("hoverLine")
        } else if (currentCard.id === 0) {
            dispatch({type: "deleteCalculatorCard", payload: currentCard.id})
            dispatch({type: "addUnderCalculatorCard", payload: 0})
            document.querySelector(".calculatorDisplayBar").classList.remove("hoverLine")
        } else if (cardIndex !== -1 && dropIndex === cardIndex + 1) {
            dispatch({type: "deleteCalculatorCard", payload: currentCard.id})
            dispatch({type: "addUnderCalculatorCard", payload: dropIndex})
            document.querySelector(card).classList.remove("hoverLine")
        } else {
            dispatch({type: "deleteCalculatorCard", payload: currentCard.id})
            dispatch({type: "addUnderCalculatorCard", payload: dropIndex + 1})
            document.querySelector(card).classList.remove("hoverLine")
        }

        dispatch({type: "takeCard", payload: null})
    }


    const clickNumberHandler = (str) => {
        if (str === "=") dispatch({type: "getResult"})
        else dispatch({type: "changeResult", payload: str})
    }


    return (
        <div className="calculatorCards">

            <div
                className="calculatorDisplayBar"
                ref={displayRef}
                draggable={constructorMode}
                style={constructorMode ? {cursor: "move"} : {cursor: ""}}
                onDragOver={e => dragOverHandler(e, ".calculatorDisplayBar")}
                onDragLeave={e => dragLeaveHandler(e, ".calculatorDisplayBar")}
                onDrop={e => dropHandler(e, 0, ".calculatorDisplayBar")}
                onDragStart={e => dragStartHandler(e, 0)}
                onDoubleClick={constructorMode ? e => {
                    dispatch({type: "deleteCalculatorCard", payload: 0})
                    document.querySelector(".calculator").removeChild(document.querySelector(".calculatorDisplayBar"))
                } : {}}
            >
                <div className="display">{result}</div>
            </div>

            <div
                className="calculatorOperatorsBar"
                ref={operatorsRef}
                draggable={constructorMode}
                style={constructorMode ? {cursor: "move"} : {cursor: ""}}
                onDragOver={e => dragOverHandler(e, ".calculatorOperatorsBar")}
                onDragLeave={e => dragLeaveHandler(e, ".calculatorOperatorsBar")}
                onDrop={e => dropHandler(e, 1, ".calculatorOperatorsBar")}
                onDragStart={e => dragStartHandler(e, 1)}
                onDoubleClick={constructorMode ? e => {
                    dispatch({type: "deleteCalculatorCard", payload: 1})
                    document.querySelector(".calculator").removeChild(document.querySelector(".calculatorOperatorsBar"))
                } : {}}
            >
                <div className="operators">
                    <div onClick={!constructorMode ? e => clickNumberHandler(" / ") : {}}>/</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler(" * ") : {}}>*</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler(" - ") : {}}>-</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler(" + ") : {}}>+</div>
                </div>
            </div>

            <div
                className="calculatorNumbersBar"
                ref={numbersRef}
                draggable={constructorMode}
                style={constructorMode ? {cursor: "move"} : {cursor: ""}}
                onDragOver={e => dragOverHandler(e, ".calculatorNumbersBar")}
                onDragLeave={e => dragLeaveHandler(e, ".calculatorNumbersBar")}
                onDrop={e => dropHandler(e, 2, ".calculatorNumbersBar")}
                onDragStart={e => dragStartHandler(e, 2)}
                onDoubleClick={constructorMode ? e => {
                    dispatch({type: "deleteCalculatorCard", payload: 2})
                    document.querySelector(".calculator").removeChild(document.querySelector(".calculatorNumbersBar"))
                } : {}}
            >
                <div className="numbers">
                    <div onClick={!constructorMode ? e => clickNumberHandler("7") : {}}>7</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("8") : {}}>8</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("9") : {}}>9</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("4") : {}}>4</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("5") : {}}>5</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("6") : {}}>6</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("1") : {}}>1</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("2") : {}}>2</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("3") : {}}>3</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler("0") : {}} id="zero">0</div>
                    <div onClick={!constructorMode ? e => clickNumberHandler(".") : {}}>.</div>
                </div>
            </div>

            <div
                className="calculatorEqualsBar"
                title="Dabble tap for clear"
                ref={equalsRef}
                draggable={constructorMode}
                style={constructorMode ? {cursor: "move"} : {cursor: ""}}
                onDragOver={e => dragOverHandler(e, ".calculatorEqualsBar")}
                onDragLeave={e => dragLeaveHandler(e, ".calculatorEqualsBar")}
                onDrop={e => dropHandler(e, 3, ".calculatorEqualsBar")}
                onDragStart={e => dragStartHandler(e, 3)}
                onDoubleClick={constructorMode ? e => {
                    dispatch({type: "deleteCalculatorCard", payload: 3})
                    document.querySelector(".calculator").removeChild(document.querySelector(".calculatorEqualsBar"))
                } : e => {
                    dispatch({type: "clearResult"})
                }}
            >
                <div onClick={!constructorMode ? e => clickNumberHandler("=") : {}} className="equals">
                    <div>=</div>
                    <div className="equalsDescription">Dabble tap for clear</div>
                </div>
            </div>

        </div>
    );
};

export default Cards;