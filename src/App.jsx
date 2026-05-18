import "./App.css";
import Routing from "./Router";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { useContext, useEffect } from "react";
import { type } from "./Utility/action.type";
function App() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: type.SET_USER, user: authUser });
      } else {
        dispatch({ type: type.SET_USER, user: null });
      }
    });
  }, []);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
