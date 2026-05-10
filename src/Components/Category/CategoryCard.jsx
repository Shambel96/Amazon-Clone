import React from "react";
import Category from "./Category";
import classes from "./category.module.css";

export default function CategoryCard({ category }) {
  return (
    <div className={classes.category}>
      <a href="#">
        <span>
          <h2>{category.title}</h2>
        </span>
        <img
          src={category.imageLink}
          alt="category image"
        />
        <p>Shop now</p>
      </a>
    </div>
  );
}
