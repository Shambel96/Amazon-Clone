import classes from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { useContext } from "react";
import amazonLogo from "../../assets/amazon_PNG11.png";
import americanFlag from "../../assets/american-flag.png";
import { auth } from "../../Utility/firebase";
const Header = () => {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  const totalItems = basket.reduce(
    (count, item) => count + (item.quantity || 1),
    0,
  );

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img src={amazonLogo} alt="amazon logo" />
            </Link>
            <div className={classes.delivery_info}>
              <span>
                <SlLocationPin size={20} />
              </span>
              <div>
                <p>Deliver to</p>
                <span className={classes.ethiopia}>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search_container}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Product" />
            <FaSearch size={38} />
          </div>
          <div className={classes.order_container}>
            <a href="" className={classes.language}>
              <img src={americanFlag} alt="American Flag" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <p onClick={()=>auth.signOut()}>Sign Out</p>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span className={classes.bold}>Account and Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span className={classes.bold}>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <FaShoppingCart size={35} />
              <span className={classes.cart_badge}>{totalItems}</span>
              <div className={classes.cart_content}>
                <p className={classes.cart_label}>Cart</p>
                <p className={classes.cart_count}>
                  {totalItems === 0
                    ? "Empty"
                    : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
