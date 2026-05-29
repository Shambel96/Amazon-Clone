import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import amazonLogo from "../../assets/amazon_PNG11.png";
import americanFlag from "../../assets/american-flag.png";
import { IoIosArrowUp } from "react-icons/io";

function Footer() {
    return (
        <footer>
            <div
                className={styles.back_to_top}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <IoIosArrowUp />

            </div>

            <div className={styles.footer_main}>
                <div className={styles.footer_grid}>
                    <div className={styles.footer_col}>
                        <h4>Get to Know Us</h4>
                        <a href="#">Careers</a>
                        <a href="#">About Amazon</a>
                        <a href="#">Investor Relations</a>
                    </div>

                    <div className={styles.footer_col}>
                        <h4>Make Money with Us</h4>
                        <a href="#">Sell products</a>
                        <a href="#">Sell on Amazon Business</a>
                        <a href="#">Sell apps</a>
                    </div>

                    <div className={styles.footer_col}>
                        <h4>Amazon Payment Products</h4>
                        <a href="#">Amazon Rewards Visa</a>
                        <a href="#">Reload Your Balance</a>
                        <a href="#">Payment Methods</a>
                    </div>

                    <div className={styles.footer_col}>
                        <h4>Let Us Help You</h4>
                        <a href="#">Your Account</a>
                        <a href="#">Shipping Rates & Policies</a>
                        <a href="#">Returns & Replacements</a>
                    </div>
                </div>

                <div className={styles.footer_bottom}>
                    <div className={styles.footer_logo}>
                        <Link to="/">
                            <img src={amazonLogo} alt="amazon logo" />
                        </Link>
                    </div>

                    <div className={styles.footer_right}>
                        <div className={styles.pill}>English</div>
                        <div className={styles.pill}>
                            <img src={americanFlag} alt="United States" className={styles.footer_flag} />
                        </div>
                        <div>© {new Date().getFullYear()} Amazon Clone</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
