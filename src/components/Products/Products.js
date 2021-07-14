import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from "./Products.module.scss";
import Product from "../Product/Product";

const Products = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try{
      const response = await axios.get('https://fakestoreapi.com/products')
      const data = response.data
      setProducts(data)
    } catch(e){
      console.log(e)
    }

  } 
  useEffect(() => {
    getProducts()
    console.log(products)
  },[])

  const renderProducts = products.map(product => <Product title={product.title} key={product.id} />)
  

  return (<div className={styles.Products}>{renderProducts}</div>);
}

export default Products;
