import "./Header.scss";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import MobileNav from "./MobileNav";
import { useState } from "react";

function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header>
      <HeaderLeft showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
      <HeaderRight />
      {showMobileNav && <MobileNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />}
    </header>
  );
}

export default Header;
