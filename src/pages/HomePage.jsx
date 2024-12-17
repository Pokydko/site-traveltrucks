import css from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
import HeroBg from "../components/HeroBg/HeroBg";

export default function Home() {
  return (
    <HeroBg>
      <div className={`${css.heroContent}`}>
        <h1 className={css.heroTitle}>Campers of your dreams</h1>
        <p className={css.heroP}>
          You can find everything you want in our catalog
        </p>
        <NavLink to="/catalog" className="btn">
          View Now
        </NavLink>
      </div>
    </HeroBg>
  );
}
