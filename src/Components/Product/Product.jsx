import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./Product.module.css";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    queueMicrotask(() => setLoading(true));
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className={classes.product_container}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div style={{ backgroundColor: "#fff", padding: "20px 0", textAlign: "center" }}>
        <hr />
        <h1 style={{padding:"30px 0 15px 0"}}>See personalized recommendations</h1>
        <Link to="/auth" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "250px",
              padding: "7px",
              backgroundColor: "#FFCE12",
              border: "1px solid #d49644",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "16px",
              color: "black",
            }}
          >
            Sign in
          </button>
        </Link>
        <p style={{padding:"5px 0 15px 0"}}>
          New Customer? <Link to="/auth" style={{ color: "blue" }}>Start here</Link>
        </p>
        <hr />
      </div>
    </>
  );
}

export default Product;
