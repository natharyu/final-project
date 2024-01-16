import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductImages } from "slices/productSlice";
import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ product }) {
  const dispatch = useDispatch();
  const { productImages, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductImages(product.id));
  }, [dispatch]);
  return (
    <article className="card">
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          <h3>{product.label}</h3>
          {productImages.map((image) => (
            <img key={image.id} src={loading ? "/assets/images/img-loading.png" : image.url} alt={product.label} />
          ))}
          <p className="card-description">{product.description}</p>
          <div className="card-footer">
            <p>{product.price} €</p>
            <p>Stock : {product.stock}</p>
          </div>
          <Link to={`/product/${product.id}`}>Voir le produit</Link>
        </>
      )}
    </article>
  );
}

export default Card;
