import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import ProductDetail from "./Pages/ProductDetail/ProductDetail"; // fixed casing too
import Results from "./Pages/Results/Results";
function Routing() {
  return (
    <BrowserRouter>                                         
      <Routes>
        <Route path="/" element={<Landing />} />             
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/categories/:CategoryName" element={<Results />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;