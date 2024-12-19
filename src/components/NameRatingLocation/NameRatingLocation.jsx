import css from "./NameRatingLocation.module.css";

export default function NameRatingLocation({
  name,
  rating,
  reviews,
  location,
}) {
  const formatLocation = (string) => {
    const [country, city] = string.split(",");
    return city + ", " + country;
  };

  const buildName = () => {
    return name.slice(0, 25) + (name.length > 25 ? "..." : "");
  };

  return (
    <div className={css.cardInfo}>
      <div className={css.titleWithPrice}>
        <h2>{buildName()}</h2>
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
    </div>
  );
}
