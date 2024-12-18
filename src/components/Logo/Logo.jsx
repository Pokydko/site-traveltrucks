import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

export default function Navigation() {
  return (
    <NavLink to="/" className={css.logo}>
      <svg className={css.logoSvg}>
        <title>TravelTrucks Company</title>
        <use href="/sprite.svg#logo"></use>
      </svg>
    </NavLink>
  );
}
