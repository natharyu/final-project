import { Outlet } from "react-router-dom";
import "./Main.scss";

function Main() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Main;
