import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { loadMore } from "../../redux/campers/slice.js";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";
import { useLocation } from "react-router-dom";

export default function CatalogList() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { page, isThereMore, lastPagination, filters } = useSelector(
    (state) => state.campers
  );
  const campers = useSelector(selectCampers);
  const handlePage = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    if (page !== lastPagination)
      dispatch(fetchCampers({ search: location.search, filters, page }));
  }, [dispatch, page, lastPagination, filters, location]);

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
