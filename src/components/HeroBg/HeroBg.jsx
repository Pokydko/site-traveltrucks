import css from "./HeroBg.module.css";
export default function HeroBg({ children }) {
  return <div className={css.heroBg}>{children}</div>;
}
