import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Products() {
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsRef);
      setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  return (
    <Grid
      container
      columns={{ xs: 4, md: 12 }}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {products.map((product, index) => (
        <Grid key={index} item xs={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
