import React, {useEffect, useState} from 'react'
import axios from 'axios';
import classes from "./Product.module.css";
import ProductCard from "./ProductCard";
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
return (
    <div className={classes.product_container}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Product
          
