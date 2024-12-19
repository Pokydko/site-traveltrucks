import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { loadMore } from "../../redux/campers/slice.js";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";

export default function CatalogList() {
  const dispatch = useDispatch();
  const { loading, error, page, isThereMore } = useSelector(
    (state) => state.campers
  );
  const campers = useSelector(selectCampers);
  const handlePage = () => {
    console.log("click");
    dispatch(loadMore());
  };

  useEffect(() => {
    console.log(page);
    dispatch(fetchCampers({ page }));
  }, [dispatch, page]);

  if (!Array.isArray(campers)) return;

  return (
    <div className={css.campersLoad}>
      <ul className={css.catalogList}>
        {campers.map((camper) => (
          <li className={css.catalogItem} key={camper.id}>
            <CatalogCard camper={camper} />
          </li>
        ))}
      </ul>
      {isThereMore && (
        <button className="btn btnWhite" onClick={handlePage}>
          Load more
        </button>
      )}
    </div>
  );
}
