import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors";
import css from "./CamperReviews.module.css";

export default function CamperReviews() {
  const { id } = useParams();
  const campers = useSelector(selectCampers);
  const chosenCamper = campers?.find((camper) => camper.id === id);

  return (
    <ul>
      {chosenCamper.reviews.map(
        ({ reviewer_name, reviewer_rating, comment }, index) => (
          <li key={`${index}`}>
            <div className={css.reviewerinfo}>
              <span className={css.literalAvatar}>{reviewer_name[0]}</span>
              <div>
                <p className={css.nameReviewer}>{reviewer_name}</p>
                <p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={`review${index} star#${star}`}
                      className={`${css.starSvg} ${reviewer_rating - star < 0 && css.starSvgGray}`}
                    >
                      <title>Current rating</title>
                      <use href="/sprite.svg#icon-star"></use>
                    </svg>
                  ))}
                </p>
              </div>
            </div>
            <p className={css.commentStyles}>{comment}</p>
          </li>
        )
      )}
    </ul>
  );
}
