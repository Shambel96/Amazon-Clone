import React from "react";
import classes from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery_info}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
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
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/1920px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <Link to="/signup">
              <p>Sign In</p>
              <span>Account and Lists</span>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <FaShoppingCart size={35} />
              <span>0</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
