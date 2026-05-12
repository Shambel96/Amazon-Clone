import React from "react";
import { type } from "./action.type";


export const initialState = {
  basket: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id,
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the basket!`,
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
  }
};
