import LayOut from "../../Layout/LayOut";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PRODUCT_BASE_URL } from "../../Api/endPoints";
import classes from "./ProductDetail.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import Loader from "../../Components/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();

  const productFromState = location?.state?.product;
  const shouldHydrateFromState =
    productFromState && String(productFromState.id) === String(productId);

  const [product, setProduct] = useState(() =>
    shouldHydrateFromState ? productFromState : null,
  );
  const [loading, setLoading] = useState(() => !shouldHydrateFromState);
  const [error, setError] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true);
      setError("");
    });
    axios
      .get(`${PRODUCT_BASE_URL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Unable to load this product right now. Please try again.");
        setLoading(false);
      });
  }, [productId]);

  const ratingValue =
    typeof product?.rating?.rate === "number" ? product.rating.rate : 0;
  const ratingCount =
    typeof product?.rating?.count === "number" ? product.rating.count : 0;
  return (
    <LayOut>
      <section className={classes.page}>
        <div className={classes.breadcrumbs}>
          <Link to="/">Home</Link>
          <span className={classes.sep}>/</span>
          {product?.category ? (
            <Link to={`/categories/${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
          ) : (
            <span>Product</span>
          )}
        </div>

        {loading ? (
          <div className={classes.loaderWrap}>
            <Loader />
          </div>
        ) : error ? (
          <div className={classes.error}>
            <p>{error}</p>
            <Link to="/" className={classes.backLink}>
              Back to products
            </Link>
          </div>
        ) : !product ? (
          <div className={classes.error}>
            <p>Product not found.</p>
            <Link to="/" className={classes.backLink}>
              Back to products
            </Link>
          </div>
        ) : (
          <div className={classes.product_detail}>
            <div className={classes.media}>
              <img
                className={classes.image}
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className={classes.info}>
              <h1 className={classes.title}>{product.title}</h1>

              <div className={classes.ratingRow}>
                <Rating value={ratingValue} precision={0.1} readOnly />
                <span className={classes.ratingCount}>
                  {ratingValue.toFixed(1)} ({ratingCount} reviews)
                </span>
              </div>

              <div className={classes.price}>
                <CurrencyFormat amount={product.price} />
              </div>

              <p className={classes.description}>{product.description}</p>
            </div>

            <aside className={classes.purchaseCard}>
              <div className={classes.purchasePrice}>
                <CurrencyFormat amount={product.price} />
              </div>
              <p className={classes.meta}>In Stock</p>
              <button className={classes.primaryBtn} type="button">
                Add to Cart
              </button>
              <button className={classes.secondaryBtn} type="button">
                Buy Now
              </button>
            </aside>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default ProductDetail;
