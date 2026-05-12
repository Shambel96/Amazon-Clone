import { IoMenu } from "react-icons/io5";
import classes from "./Header.module.css";
const LowerHeader = () => {
  return (
    <div className={classes.lower_header}>
      <ul>
        <li>
            <IoMenu />
          <p>All</p>
        </li>
        <li>Today's deals</li>
        <li>Costumer Services</li>
        <li>Registry</li>
        <li>Gift cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
