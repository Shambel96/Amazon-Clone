import LayOut from '../../Layout/LayOut';
import classes from './cart.module.css';
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useContext } from "react";
import CartItemCard from './CartItemCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';

function Cart() {
  const { state } = useContext(DataContext);

  const totalItems = state.basket.reduce(
    (count, item) => count + (item.quantity || 1),
    0,
  );

  // Calculate totals using basket quantities
  const subtotal = state.basket.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <LayOut>
      <div className={classes.cart_container}>
        <div className={classes.cart_header}>
          <h2>Shopping Cart</h2>
          <p>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          <hr />
        </div>

        {state.basket.length === 0 ? (
          <div className={classes.empty_cart}>
            <p>Your cart is empty</p>
            <Link to="/">Continue Shopping</Link>
          </div>
        ) : (
          <div className={classes.cart_content}>
            <div className={classes.cart_items}>
              {state.basket.map((item) => (
                <CartItemCard key={item.id} product={item} />
              ))}
            </div>

            <div className={classes.cart_summary}>
              <div className={classes.summary_header}>Order Summary</div>
              
              <div className={classes.summary_row}>
                <span>Subtotal:</span>
                <span><CurrencyFormat amount={subtotal} /></span>
              </div>

              <div className={classes.summary_row}>
                <span>Tax (10%):</span>
                <span><CurrencyFormat amount={tax} /></span>
              </div>

              <div className={classes.summary_row + ' ' + classes.total}>
                <span>Total:</span>
                <span><CurrencyFormat amount={total} /></span>
              </div>

               <Link to="/payment">  <button className={classes.checkout_button}>
                Proceed to Checkout
                </button>
              </Link>

              <Link to="/" className={classes.continue_shopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default Cart;
