import classes from "./CartItemCard.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
import { useContext } from "react";

function CartItemCard({ product }) {
  const { dispatch } = useContext(DataContext);
  const quantity = product.quantity || 1;

  const removeFromCart = () => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id: product.id,
    });
  };

  const handleIncrement = () => {
    dispatch({
      type: type.UPDATE_BASKET_QUANTITY,
      id: product.id,
      quantity: quantity + 1,
    });
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart();
    } else {
      dispatch({
        type: type.UPDATE_BASKET_QUANTITY,
        id: product.id,
        quantity: quantity - 1,
      });
    }
  };

  const ratingValue =
    typeof product?.rating?.rate === "number" ? product.rating.rate : 0;
  const ratingCount =
    typeof product?.rating?.count === "number" ? product.rating.count : 0;

  const totalPrice = product.price * quantity;

  return (
    <div className={classes.cart_item_card}>
      <Link to={`/products/${product.id}`} state={{ product }} className={classes.product_image_link}>
        <img src={product.image} alt={product.title} className={classes.product_image} />
      </Link>

      <div className={classes.product_details}>
        <Link to={`/products/${product.id}`} state={{ product }} className={classes.product_title_link}>
          <h3 className={classes.product_title}>{product.title}</h3>
        </Link>

        <div className={classes.rating_section}>
          <Rating value={ratingValue} precision={0.1} readOnly size="small" />
          <span className={classes.rating_count}>({ratingCount} reviews)</span>
        </div>

        <div className={classes.price_section}>
          <span className={classes.price_label}>Price per item:</span>
          <CurrencyFormat amount={product.price} />
        </div>
      </div>

      <div className={classes.quantity_section}>
        <label>Quantity:</label>
        <div className={classes.quantity_controls}>
          <button
            className={classes.qty_button}
            onClick={handleDecrement}
            title="Decrease quantity"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={classes.quantity_display}>{quantity}</span>
          <button
            className={classes.qty_button}
            onClick={handleIncrement}
            title="Increase quantity"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className={classes.total_section}>
        <span className={classes.total_label}>Total:</span>
        <CurrencyFormat amount={totalPrice} />
      </div>

      <button className={classes.remove_button} onClick={removeFromCart} title="Remove from cart">
        Remove
      </button>
    </div>
  );
}

export default CartItemCard;
