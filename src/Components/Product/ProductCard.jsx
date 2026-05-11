import React from "react";
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <div className={classes.card_container}>
      <Link to={`/products/${product.id}`} state={{ product }}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div>
        <h3>{product.title}</h3>
        <div className={classes.rating}>
          <Rating value={product.rating.rate} precision={0.1} />
          <span> ({product.rating.count} reviews)</span>
        </div>
        <div>
          {/*price*/}
          <CurrencyFormat amount={product.price} />
        </div>
        <button className={classes.button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
