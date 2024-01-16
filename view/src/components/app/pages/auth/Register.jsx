import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginRegister.scss";

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;

    await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          navigate("/login");
        } else {
          setError(response.error);
        }
      });
  };

  return (
    <form id="register" onSubmit={handleSubmit}>
      <h2>S'enregistrer</h2>
      {error && <span>{error}</span>}
      <label htmlFor="email">
        Email :
        <input type="email" name="email" placeholder="email" required />
      </label>
      <label htmlFor="password">
        Mot de passe :
        <input type="password" name="password" placeholder="mot de passe" required />
      </label>
      <button type="submit">S'enregistrer</button>
    </form>
  );
}

export default Register;
