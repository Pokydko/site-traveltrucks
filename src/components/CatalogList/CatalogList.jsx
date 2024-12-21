import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { loadMore, initializeFilters } from "../../redux/campers/slice.js";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";
import { useLocation } from "react-router-dom";

export default function CatalogList() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { page, isThereMore, filters } = useSelector((state) => state.campers);
  const campers = useSelector(selectCampers);
  const handlePage = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    dispatch(initializeFilters(params));
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page }));
  }, [dispatch, filters, page]);

  if (!Array.isArray(campers)) return null;

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
