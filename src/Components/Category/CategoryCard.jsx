import React from "react";
import Category from "./Category";
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
        <p>Shop now</p>
      </Link>
      <hr />
    </div>
  );
}
