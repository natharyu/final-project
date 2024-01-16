import "./Header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      Header
      <Link to="/">Retour au site</Link>
    </header>
  );
}

export default Header;
