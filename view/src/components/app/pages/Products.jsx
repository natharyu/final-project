import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getProducts, getCategories } from "slices/productSlice";
import "./Home.scss";
import "./Products.scss";
import { Link } from "react-router-dom";

function Products() {
  const { products, categories, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div id="products">
      <h2>Catégories</h2>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ul>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <li>{category.label}</li>
            </Link>
          ))}
        </ul>
      )}

      <h2>Nos produits</h2>
      <section>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Products;
