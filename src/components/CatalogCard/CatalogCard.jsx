import css from "./CatalogCard.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { NavLink } from "react-router-dom";

export default function CatalogCard({
  camper: { id, name, description, gallery, price, rating, reviews, location },
  camper,
}) {
  const formatLocation = (string) => {
    const [country, city] = string.split(",");
    return city + ", " + country;
  };

  const buildName = () => {
    return name.slice(0, 25) + (name.length > 25 ? "..." : "");
  };

  return (
    <div className={css.card}>
      <div className={css.thumbWrp}>
        <img
          src={gallery[0].thumb}
          alt={`This camper: ${description}`}
          className={css.camperThumb}
        />
      </div>
      <div className={css.cardInfo}>
        <div className={css.titleWithPrice}>
          <h2>{buildName()}</h2>
          <span className={css.price}>
            &#8364;{price}.00
            <button>
              <svg className={css.heartSvg}>
                <title>Add camper to favorite</title>
                <use href="/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </span>
        </div>
        <div className={css.ratingLocation}>
          <svg className={css.starSvg}>
            <title>Current rating</title>
            <use href="/sprite.svg#icon-star"></use>
          </svg>
          {rating} ({reviews.length} Reviews)
          <svg className={css.locationSvg}>
            <title>Location</title>
            <use href="/sprite.svg#icon-location"></use>
          </svg>
          {formatLocation(location)}
        </div>
        <p className={css.about}>{description.slice(0, 61)}...</p>
        <VehicleEquipment camper={camper} scrollbar={true} />
        {/* <NavLink to={`/catalog/${id}/features`} className="btn">
          Show more
        </NavLink> */}
        <a className="btn" href={`/catalog/${id}/features`} target="_blank">
          Show more
        </a>
      </div>
    </div>
  );
}
