import React, { useEffect } from "react";
import { useTracked } from "../state";

function random(limit) {
  return Math.floor(Math.random() * limit);
}

export default function Equation() {
  const [state, dispatch] = useTracked();

  function createEquation() {
    let limit, coefficient, symbol, answer, number, right;
    let count = 10;
    do {
      limit = state.equation.limit;
      coefficient = random(limit);
      symbol = random(2) === 1 ? "+" : "-";
      answer = random(limit);
      number = random(limit);
      right = calculateEquation({
        coefficient,
        input: answer,
        symbol,
        number,
      });
      if (count < 0) {
        console.log("breaked");
        break;
      }
      count--;
      console.log({ limit, coefficient, symbol, answer, number, right });
    } while (number != 0 && (state.allowNegative || right < 0));

    updateEquation({ coefficient, answer, symbol, number, right });
  }
  function calculateEquation({ coefficient, input, symbol, number }) {
    let right = coefficient > 0 ? coefficient * input : input;
    right = symbol == "+" ? right + number : right - number;
    return right;
  }
  function updateEquation({ coefficient, answer, symbol, number, right }) {
    dispatch({
      type: "SET_EQUATION",
      equation: {
        ...state.equation,
        left: {
          coefficient,
          input: 0,
          symbol,
          number,
        },
        right,
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
    localStorage.setItem("category", state.category);
    let limit =
      state.category === "chicken"
        ? 10
        : state.category === "hamburger"
        ? 20
        : 30;
    dispatch({
      type: "SET_LIMIT",
      limit,
    });
    createEquation();
    console.log("category, limit", limit);
  }, [state.category, state.equation.limit]);

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
      <div className="answer">{left.input > 0 ? left.input : "?"}</div> &nbsp;
      {left.symbol}
      &nbsp;
      {left.number}
      &nbsp;=&nbsp;{right}
    </div>
  );
}
