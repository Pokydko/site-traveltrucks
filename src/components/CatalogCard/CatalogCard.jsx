import css from "./CatalogCard.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import NameRatingLocation from "../NameRatingLocation/NameRatingLocation";
import PriceLike from "../PriceLike/PriceLike";

export default function CatalogCard({
  camper: { id, description, gallery, price },
  camper,
}) {
  if (!camper) return null;
  return (
    <div className={css.card}>
      <PriceLike price={price} id={id} />
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
          id={camper.id}
        />
        <p className={css.about}>{description.slice(0, 61)}...</p>
        <VehicleEquipment camper={camper} scrollbar={true} />
        <a
          className="btn"
          href={`/catalog/${id}/features`}
          target="_blank"
          rel="noreferrer"
        >
          Show more
        </a>
      </div>
    </div>
  );
}
