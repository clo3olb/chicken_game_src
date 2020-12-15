import { useReducer } from "react";
import { createContainer } from "../node_modules/react-tracked";

const initialState = {
  loaded: false,
  allowNegative: false,
  category: "chicken",
  selected: {
    index: 1,
    isActive: false,
  },
  equation: {
    limit: 10,
    left: {
      coefficient: 1,
      input: 0,
      symbol: "+",
      number: 0,
    },
    right: 0,
    answer: 0,
  },
  balance: "none",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        loaded: true,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
      };
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.selected,
      };
    case "SET_EQUATION":
      return {
        ...state,
        equation: action.equation,
      };
    case "SET_LIMIT":
      return {
        ...state,
        equation: {
          ...state.equation,
          limit: action.limit,
        },
      };
    case "SET_ALLOW_NEGATIVE":
      return {
        ...state,
        allowNegative: action.allowNegative,
      };
    case "RESET_EQUATION":
      return {
        ...state,
        equation: {
          ...state.equation,
          left: {
            ...state.equation.left,
            input: 0,
          },
        },
        balance: "none",
      };
    case "CHECK_EQUATION":
      const { left, right } = state.equation;
      let balance = "equal";
      let result = left.coefficient * left.input;
      result = left.symbol == "+" ? result + left.number : result - left.number;
      if (result > right) {
        balance = "left";
      } else if (result < right) {
        balance = "right";
      }
      return {
        ...state,
        balance,
      };
    case "RESET_SLIDE_PAGE":
      return {
        ...state,
        balance: "none",
      };

    default:
      throw new Error("unknown action type");
  }
};

const useValue = () => useReducer(reducer, initialState);

export const { Provider, useTracked } = createContainer(useValue);
