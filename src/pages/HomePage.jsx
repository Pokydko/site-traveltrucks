import css from "./HomePage.module.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className={css.heroBg}>
      <div className={`container ${css.heroContent}`}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.heroP}>
          You can find everything you want in our catalog
        </p>
        <NavLink to="/catalog" className="btn">
          View Now
        </NavLink>
      </div>
    </div>
  );
}
