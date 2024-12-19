import css from "./PriceLike.module.css";

export default function PriceLike({ price }) {
  return (
    <span className={css.price}>
      &#8364;{price}.00
      <button>
        <svg className={css.heartSvg}>
          <title>Add camper to favorite</title>
          <use href="/sprite.svg#icon-heart"></use>
        </svg>
      </button>
    </span>
  );
}
