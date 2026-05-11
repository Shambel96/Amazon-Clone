import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import SignUp from "./Pages/Auth/SignUp";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import ProductDetail from "./Pages/ProductDetail/ProductDetail"; // fixed casing too
import Results from "./Pages/Results/Results";
function Routing() {
  return (
    <BrowserRouter>                                          {/* ✅ was <Router> */}
      <Routes>
        <Route path="/" element={<Landing />} />             {/* ✅ was element={Landing} */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories/:CategoryName" element={<Results />} /> {/* ✅ was element={Results} */}
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;