import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {DataProvider} from "./Components/DataProvider/DataProvider";
import { initialState, reducer } from "./Utility/reducer";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider initialState={initialState} reducer={reducer}>
    <App />
    </DataProvider>
  </StrictMode>,
)

