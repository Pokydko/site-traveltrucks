import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  createFilterQuery,
} from "../../redux/campers/operations";
import {
  loadMore,
  refreshCampers,
  initializeFilters,
} from "../../redux/campers/slice.js";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function CatalogList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const { page, limit, isThereMore, filters, loading } = useSelector(
    (state) => state.campers
  );
  const handlePage = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    const filterQuery = createFilterQuery(filters);
    const searchParams = new URLSearchParams(filterQuery);
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
  }, [filters, page, limit, navigate, location.pathname]);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    dispatch(refreshCampers());
    dispatch(initializeFilters(params));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (page > 0) {
      dispatch(fetchCampers({ filters, page }));
    } else dispatch(loadMore());
  }, [dispatch, filters, page]);

  if (campers.length === 0)
    return (
      <div className={css.notFoundCampers}>
        Unfortunately, no camper has been found that would meet all the
        requirements at the same time.
      </div>
    );

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
