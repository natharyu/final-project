import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "slices/authSlice";

function HeaderRight() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "GET" }).then((response) => {
      if (response.ok) {
        dispatch(logout());
        navigate("/");
      } else {
        setError("Erreur lors de la déconnexion !");
      }
    });
  };

  return (
    <nav className="header-right">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/products">Produits</NavLink>
      {isLoggedIn && role === "admin" && <NavLink to="/dashboard">Dashboard</NavLink>}
      {!isLoggedIn ? (
        <>
          <NavLink to="/login">Se connecter</NavLink>
          <NavLink to="/register">S'enregistrer</NavLink>
        </>
      ) : (
        <button onClick={handleLogout}>Se deconnecter</button>
      )}
    </nav>
  );
}

export default HeaderRight;
