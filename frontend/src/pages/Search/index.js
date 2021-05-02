import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Api from "../../util/Api";
import Products from "../../pages/Products";
import Box from "@material-ui/core/Box";

export default function Index() {
  const { search_text } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Api()
      .get(`/product/search/${search_text}`)
      .then((res) => setProducts(res.data))
      .catch((error) => setProducts([]));
  }, [search_text]);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Box ml={4}>
            <h3>
              {products.length} items found for "{search_text}"
            </h3>
          </Box>
          <Products oldProducts={products} />
        </>
      ) : (
        <h3>Sorry, no products available!</h3>
      )}
    </div>
  );
}
