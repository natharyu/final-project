import "./MobileNav.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "slices/authSlice";

function MobileNav({ showMobileNav, setShowMobileNav }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setShowMobileNav(!showMobileNav);
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
    <div id="mobile-nav">
      <aside>
        <button id="closeMobileNav" onClick={() => setShowMobileNav(!showMobileNav)}>
          X
        </button>
        <nav>
          <NavLink to="/" onClick={() => setShowMobileNav(!showMobileNav)}>
            Accueil
          </NavLink>
          <NavLink to="/products" onClick={() => setShowMobileNav(!showMobileNav)}>
            Produits
          </NavLink>
          {isLoggedIn && role === "admin" && (
            <NavLink to="/dashboard" onClick={() => setShowMobileNav(!showMobileNav)}>
              Dashboard
            </NavLink>
          )}
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" onClick={() => setShowMobileNav(!showMobileNav)}>
                Se connecter
              </NavLink>
              <NavLink to="/register" onClick={() => setShowMobileNav(!showMobileNav)}>
                S'enregistrer
              </NavLink>
            </>
          ) : (
            <button id="logout" onClick={handleLogout}>
              Se deconnecter
            </button>
          )}
        </nav>
      </aside>
    </div>
  );
}

export default MobileNav;
