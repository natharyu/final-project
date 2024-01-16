import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomProducts } from "slices/productSlice";
import Card from "../components/Card";
import "./Home.scss";

function Home() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomProducts());
  }, [dispatch]);

  return (
    <div id="home">
      <h2>Nos produits du moment</h2>
      <section>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Home;
