import React, { use } from "react";
import { useParams } from "react-router-dom";
import LayOut from "../../Layout/LayOut";
import axios from "axios";
import { useEffect, useState } from "react";
import { PRODUCT_BASE_URL } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Results.module.css";
function Results() {
  const [products, setProducts] = useState([]);
  const { CategoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${PRODUCT_BASE_URL}/products/category/${CategoryName}`)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [CategoryName]);

  return (
    <LayOut>
      <section className={classes.result_container}>
        <h1
          style={{
            marginBottom: "50px",
            padding: "0 20px",
            marginTop: "30px",
            color: "#333",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Results for/ {CategoryName}
        </h1>
        <hr />
        <div className={classes.product_grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
