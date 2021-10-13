import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ProductResults.module.css";

const ProductResults = () => {
  const { pathname } = useLocation();
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.products.error);

  const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  
  let title= '';
  if(lastItem.length > 1) {
    title = lastItem.replace(/[^a-z]+/g, "") + "'s";
  } 

  let content = <h3>Sorry! No products found.</h3>;

  if ((Array.isArray(products) && products.length > 0)) {
    content = (
      <section className={classes.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.data.title}
            price={product.data.price}
            imgName={product.data.imgName[0]}
            img2={product.data.imgName[1]}
          />
        ))}
      </section>
    );
  }

  return (
    <>
      <h2>{title} Products</h2>
      {error && <p>{error}</p>}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && !error && content}
    </>
  );
};

export default ProductResults;
