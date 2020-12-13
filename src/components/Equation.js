import React, { useEffect } from "react";
import { useTracked } from "../state";

function random(limit) {
    return Math.floor(Math.random() * limit);
}

export default function Equation() {
    const [state, dispatch] = useTracked();

    function createEquation() {
        const limit = state.category === 'chicken' ? 10 : state.category === 'pizza' ? 20 : 30;
        const coefficient = random(limit);
        const symbol = random(2) == 1 ? "+" : "-";
        const answer = random(limit);
        const number = random(limit);
        updateEquation({ coefficient, symbol, answer, number });
    }
    function calculateEquation({ coefficient, input, symbol, number }) {
        let right = coefficient * input;
        right = symbol == "+" ? right + number : right - number;
        return right;
    }
    function updateEquation({ coefficient, answer, symbol, number, limit }) {
        dispatch({
            type: "SET_EQUATION",
            equation: {
                ...state.equation,
                limit,
                left: {
                    ...state.equation.left,
                    coefficient,
                    input: 0,
                    symbol,
                    number,
                },
                right: calculateEquation({
                    coefficient,
                    input: answer,
                    symbol,
                    number,
                }),
                answer,
            },
        });
    }

    function handleCheckClick(e) {
        if (state.balance == "equal" || state.balance == "none") {
            dispatch({ type: "CHECK_EQUATION" });
            const element = document.getElementById("Equation");
            element.classList.remove("shake");
            void element.offsetWidth;
            element.classList.add("shake");
        } else {
            dispatch({ type: "RESET_EQUATION" });
        }

    }

    useEffect(() => {
        if (state.balance == "equal") {
            setTimeout(() => createEquation(), 1000);
            setTimeout(() => dispatch({ type: "RESET_SLIDE_PAGE" }), 3200);
        }
    }, [state.balance]);

    useEffect(() => {
        createEquation();
    }, [state.category]);

    const { left, right } = state.equation;

    return (
        <div id="Equation" className="bg_primary color_secondary">
            <button
                onClick={handleCheckClick}
                className="check bg_secondary color_primary"
            >
                {state.balance == "none"
                    ? "정답확인"
                    : state.balance == "equal"
                        ? "정답"
                        : "오답"}
            </button>
            {left.coefficient > 1 ? `${left.coefficient} x ` : undefined} &nbsp;
            <div className="answer">
                {left.input > 0 ? left.input : "?"}
            </div>{" "}
            &nbsp;
            {left.symbol}
            &nbsp;
            {left.number}
            &nbsp;=&nbsp;{right}
        </div>
    );
}
