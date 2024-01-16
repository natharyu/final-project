import { Link } from "react-router-dom";

function HeaderLeft({ showMobileNav, setShowMobileNav }) {
  return (
    <div className="header-left">
      <div id="burger" onClick={() => setShowMobileNav(!showMobileNav)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Link to="/">
        <h1>Commerce</h1>
      </Link>
    </div>
  );
}

export default HeaderLeft;
