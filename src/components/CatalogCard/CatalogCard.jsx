import css from "./CatalogCard.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import NameRatingLocation from "../NameRatingLocation/NameRatingLocation";
import PriceLike from "../PriceLike/PriceLike";

export default function CatalogCard({
  camper: { id, description, gallery, price },
  camper,
}) {
  return (
    <div className={css.card}>
      <PriceLike price={price} />
      <div className={css.thumbWrp}>
        <img
          src={gallery[0].thumb}
          alt={`This camper: ${description}`}
          className={css.camperThumb}
        />
      </div>
      <div className={css.cardInfo}>
        <NameRatingLocation
          name={camper.name}
          rating={camper.rating}
          reviews={camper.reviews}
          location={camper.location}
        />
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
