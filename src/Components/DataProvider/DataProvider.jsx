import React, { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../../Utility/reducer";

export const DataContext = createContext();

export const DataProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useStateValue = () => useContext(DataContext);