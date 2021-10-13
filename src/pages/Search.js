import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProducts } from "../redux/products/products-actions";
import ProductResults from "../components/Shop/ProductResults";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();

  useEffect(() => {
    if(filterType === 'women' || filterType === 'men') {
      dispatch(fetchProducts(filterType));
    } else {
      history.push('/not-found')
    }
  }, [dispatch, filterType, history]);

  return <ProductResults />;
};

export default Search;

