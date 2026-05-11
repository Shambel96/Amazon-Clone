import React from "react";
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

function ProductCard({ product }) {
  return (
    <div className={classes.card_container}>
      <a href="">
        <img src={product.image} alt={product.title} />
      </a>
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
