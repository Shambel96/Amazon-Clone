import React from 'react'
import { categoryInfo } from "./CategoryInfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";

export default function Category() {
  return (
    <div className={classes.category_container}>
      {categoryInfo.map((infos) => (
        <CategoryCard key={infos.name} category={infos} />
      ))}
    </div>
  )
}
