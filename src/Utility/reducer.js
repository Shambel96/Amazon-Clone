import React from "react";
import { type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      const existingItemIndex = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id,
      );
      if (existingItemIndex >= 0) {
        // Item already in the basket, update quantity
        const updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex].quantity += action.item.quantity;
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        // Item not in the basket, add it with quantity
        return {
          ...state,
          basket: [
            ...state.basket,
            { ...action.item, quantity: action.item.quantity || 1 },
          ],
        };
      }
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
    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case type.UPDATE_BASKET_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((basketItem) =>
          basketItem.id === action.id
            ? { ...basketItem, quantity: Math.max(1, action.quantity) }
            : basketItem,
        ),
      };
  }
};
