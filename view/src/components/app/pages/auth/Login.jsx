import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "slices/authSlice.js";
import "./LoginRegister.scss";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    await fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          dispatch(checkAuth());
          navigate("/");
        } else {
          setError(response.error);
        }
      });
  };

  return (
    <form id="login" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      {error && <span>{error}</span>}
      <label htmlFor="email">
        Email :
        <input type="email" name="email" placeholder="email" required />
      </label>
      <label htmlFor="password">
        Mot de passe :
        <input type="password" name="password" placeholder="mot de passe" required />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;
