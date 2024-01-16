import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, getProductImages } from "slices/productSlice";
import "./Product.scss";

function Product() {
  const { product, productImages, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProductImages(id));
  }, [dispatch]);

  const handleChange = (event) => {
    if (event.target.value >= product.stock) {
      event.target.value = product.stock;
    }
    setQuantity(Number(event.target.value));
  };

  return (
    <>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <section>
          {product.map((product) => (
            <article key={product.id} className="product">
              {productImages.map((image) => (
                <img key={image.id} src={loading ? "/assets/images/img-loading.png" : image.url} alt={product.label} />
              ))}
              <div className="product-details">
                <h3>{product.label}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <p>{product.price} €</p>
                  <p>Encore {product.stock} en stock</p>
                </div>
                <div className="product-action">
                  <label htmlFor="quantity">
                    Quantité :
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max={product.stock}
                      defaultValue={quantity}
                      onChange={handleChange}
                    />
                  </label>
                  <button>Ajouter au panier</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
