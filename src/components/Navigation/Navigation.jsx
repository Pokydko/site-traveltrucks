import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <>
      <Logo />
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={buildLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </>
  );
}
