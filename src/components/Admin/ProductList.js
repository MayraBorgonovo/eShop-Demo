import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/products/products-actions";
import Image from "../UI/Image";
import Button from "../UI/forms/Button";
import classes from "./ProductList.module.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  let content = (
    <table className={classes.productList}>
      <tbody>
      {products.map((product) => (
        <tr key={product.id}>
        <td className={classes.img}>
          <Image src={product.data.imgName[0]} alt={product.data.title}/>
        </td>
        <td>{product.data.title}</td>
        <td className={classes.small}>${product.data.price}</td>
        <td className={classes.small}>
          <Button onClick={() => dispatch(deleteProduct(product.id))}>
            Delete
          </Button>
        </td>
      </tr>
      ))}
      </tbody>
    </table>
);

  if(products.length < 1) {
    content = <div>
      <p>No products found.</p>
    </div>
  }

  return content;
};

export default ProductList;
