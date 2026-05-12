import { useParams } from "react-router-dom";
import LayOut from "../../Layout/LayOut";
import axios from "axios";
import { useEffect, useState } from "react";
import { PRODUCT_BASE_URL } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [products, setProducts] = useState([]);
  const { CategoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true);
      setError("");
    });
    axios
      .get(`${PRODUCT_BASE_URL}/products/category/${CategoryName}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Unable to load category results right now.");
        setLoading(false);
      });
  }, [CategoryName]);

  return (
    <LayOut>
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
      ) : error ? (
        <section className={classes.result_container}>
          <h1
            style={{
              marginBottom: "20px",
              padding: "0 20px",
              marginTop: "30px",
              color: "#333",
              textAlign: "center",
            }}
          >
            {error}
          </h1>
        </section>
      ) : (
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
            Results for {CategoryName}
          </h1>
          <hr />
          <div className={classes.product_grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
}
export default Results;
