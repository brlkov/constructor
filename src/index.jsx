import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";


const roundPlus = (x) => {
    let m = Math.pow(10, 2);
    return Math.round(x * m) / m;
}

const defaultState = {
    constructorMode: true,
    currentCard: null,
    calculatorCards: [],
    calculator: [],
    result: "0",
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "constructorModeActive":
            return {...state, constructorMode: action.payload}

        case "takeCard":
            const card = state.calculatorCards.find(card => card.id === action.payload)
            return {...state, currentCard: card}

        case "addCalculatorCard":
            if (state.currentCard.id === 0) {
                state.calculator.splice(0, 0, state.currentCard)
                return {...state, calculator: state.calculator.filter(card => card.id !== 200)}
            } else return {...state, calculator: [...state.calculator, action.payload]}
        case "addUnderCalculatorCard":
            state.calculator.splice(action.payload, 0, state.currentCard)
            return {...state, calculator: state.calculator.filter(card => card.id !== 200)}
        case "deleteCalculatorCard":
            return {...state, calculator: state.calculator.filter(card => card.id !== action.payload)}

        case "changeResult":
            if (state.result === "0" && action.payload === ".") {
                return {...state, result: "0."}
            } else if (state.result === "0") {
                return {...state, result: action.payload}
            } else if (state.result.length >= 10) {
                return {...state, result: state.result}
            } else {
                return {...state, result: state.result + action.payload}
            }
        case "getResult":
            return {...state, result: roundPlus(eval(state.result))}
        case "clearResult":
            return {...state, result: "0"}

        default:
            return state
    }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
