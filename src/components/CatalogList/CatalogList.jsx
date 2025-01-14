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
  setReady,
} from "../../redux/campers/slice.js";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function CatalogList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const campers = useSelector(selectCampers);
  const {
    page,
    limit,
    isThereMore,
    campersLocation,
    filters,
    camperForms,
    ready,
    loading,
  } = useSelector((state) => state.campers);
  const handlePage = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    dispatch(refreshCampers());
  }, [dispatch, campersLocation, filters, camperForms]);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    dispatch(refreshCampers());
    dispatch(initializeFilters(params));
  }, [dispatch, location.search]);

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
    const queryForm = createFilterQuery(camperForms);
    if (campersLocation) filterQuery.location = campersLocation;
    setSearchParams({ ...filterQuery, ...queryForm }, { replace: true });
    // if (page === 1) dispatch(refreshCampers());
    dispatch(fetchCampers({ limit, page }));
  }, [
    dispatch,
    setSearchParams,
    navigate,
    campersLocation,
    filters,
    camperForms,
    page,
    limit,
    location.pathname,
  ]);

  useEffect(() => {
    if (ready) {
      dispatch(fetchCampers({ filters, page }));
    } else dispatch(setReady());
  }, [dispatch, filters, page, ready]);

  if (!loading && campers.length === 0)
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
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
