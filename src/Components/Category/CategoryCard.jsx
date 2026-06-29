import classes from "./category.module.css";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <div className={classes.category}>
      <hr />
      <Link className={classes.categoryLink} to={`/categories/${category.name}`}>
        <span>
          <h2>{category.title}</h2>
        </span>
        <img src={category.imageLink} alt="category image" />
        <div className={classes.shopNow}>
          <span>Shop now</span>
          <span className={classes.arrow} aria-hidden="true">→</span>
        </div>
      </Link>
      <hr />
    </div>
  );
}
