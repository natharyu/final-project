import { getProductsByCategory } from "slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "../components/Card";
import { getCategory } from "../../../store/slices/productSlice";
import "./Home.scss";

function Category() {
  const { products, category, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductsByCategory(id));
    dispatch(getCategory(id));
  }, [dispatch]);
  return (
    <div id="category">
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          {category.map((category) => (
            <h2 key={category.id}>Catégorie : {category.label}</h2>
          ))}
        </>
      )}
      <section>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Category;
