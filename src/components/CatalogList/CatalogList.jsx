import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { selectCampers } from "../../redux/campers/selectors";
import CatalogCard from "../CatalogCard/CatalogCard";
import css from "./CatalogList.module.css";

export default function CatalogList() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.campers);
  const campers = useSelector(selectCampers);

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  return (
    <ul className={css.catalogList}>
      {campers.map((camper) => (
        <li className={css.catalogItem} key={camper.id}>
          <CatalogCard camper={camper} />
        </li>
      ))}
    </ul>
    // load more btn
  );
}
