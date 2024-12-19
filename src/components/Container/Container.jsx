import css from "./Container.module.css";
export default function Container({ children, direction }) {
  return (
    <div className={`${css.container} ${direction === "row" && css.row}`}>
      {children}
    </div>
  );
}
