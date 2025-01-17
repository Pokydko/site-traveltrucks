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
import { useSearchParams } from "react-router-dom";

export default function CatalogList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const campers = useSelector(selectCampers);
  const { page, isThereMore, campersLocation, filters, camperForms, loading } =
    useSelector((state) => state.campers);
  const handlePage = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    dispatch(refreshCampers());
    dispatch(initializeFilters(params));
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(
      fetchCampers({
        searchParams: {
          ...Object.fromEntries(new URLSearchParams(searchParams)),
        },
      })
    );
  }, [dispatch, searchParams, page]);

  useEffect(() => {
    const filterQuery = createFilterQuery(filters);
    if (campersLocation) filterQuery.location = campersLocation;
    const queryForm = createFilterQuery(camperForms);
    const searchParams = new URLSearchParams({ ...filterQuery, ...queryForm });
    setSearchParams({ ...filterQuery, ...queryForm }, { replace: true });
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
  }, [
    dispatch,
    setSearchParams,
    navigate,
    campersLocation,
    filters,
    camperForms,
    location.pathname,
  ]);

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
