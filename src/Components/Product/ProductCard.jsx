import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext, DataProvider } from "../DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
import { useContext } from "react";

function ProductCard({ product, hideAddButton, horizontal }) {
  const { state, dispatch } = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        quantity: 1,
      },
    });
  };

  const ratingValue =
    typeof product?.rating?.rate === "number" ? product.rating.rate : 0;
  const ratingCount =
    typeof product?.rating?.count === "number" ? product.rating.count : 0;

  return (
    <div className={`${classes.card_container} ${horizontal ? classes.horizontal_card : ""}`.trim()}>
      <Link to={`/products/${product.id}`} state={{ product }}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div>
        <h3>{product.title}</h3>
        <div className={classes.rating}>
          <Rating value={ratingValue} precision={0.1} readOnly />
          <span> ({ratingCount} reviews)</span>
        </div>
        <div>
          {/*price*/}
          <CurrencyFormat amount={product.price} />
        </div>
        {!hideAddButton && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
