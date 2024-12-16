import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <>
      <NavLink to="/" className={css.logo}>
        <svg className={css.logoSvg}>
          <use href="/sprite.svg#logo"></use>
        </svg>
      </NavLink>
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
