import css from "./PriceLike.module.css";
import { useDispatch, useSelector } from "react-redux";
import { switchFavorites } from "../../redux/campers/slice";

export default function PriceLike({ price, id }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.campers);
  function toFavorites() {
    dispatch(switchFavorites(id));
  }

  return (
    <span className={css.price}>
      &#8364;{price}.00
      <button onClick={toFavorites}>
        <svg
          className={`${css.heartSvg} ${favorites.includes(id) && css.inFavorites}`}
        >
          <title>Add camper to favorite</title>
          <use href="/sprite.svg#icon-heart"></use>
        </svg>
      </button>
    </span>
  );
}
