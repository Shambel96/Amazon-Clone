import React from "react";
import './App.css'
import Header from './Components/Header/Header.jsx'
import Carousel from "./Components/Carousel/Carousel.jsx";
import Category from "./Components/Category/Category.jsx";
import Product from "./Components/Product/Product.jsx";
function App() {

  return (
  <div>
    <Header />
    <Carousel />
    <Category />
    <Product />
  </div>
  )
}

export default App;
