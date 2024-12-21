import css from "./Filters.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  createFilterQuery,
} from "../../redux/campers/operations";
import { refreshCampers } from "../../redux/campers/slice";
import { useSearchParams } from "react-router-dom";

export default function Filters() {
  const { filters, page, limit } = useSelector((state) => state.campers);
  const optionsToShow = Object.fromEntries(
    Object.keys(filters).map((key) => [key, true])
  );

  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = () => {
    setSearchParams(createFilterQuery(filters), { replace: true });

    dispatch(refreshCampers());
    dispatch(fetchCampers({ filters, limit, page }));
  };

  return (
    <div className={css.filters}>
      <p className={css.locationTitle}>Location</p>
      <div className={css.locationInputWrapper}>
        <input className={css.locationInput} type="text" placeholder="City" />
        <svg className={css.locationIco}>
          <title>Location</title>
          <use href="/sprite.svg#icon-location"></use>
        </svg>
      </div>
      <p className={css.filtersTitle}>Filters</p>
      <h2 className={css.equipmentTitle}>Vehicle equipment</h2>
      <VehicleEquipment camper={optionsToShow} filters={filters} />
      <h2 className={`${css.equipmentTitle} ${css.marginForEquipment}`}>
        Vehicle type
      </h2>
      <div className={css.vehicleTypeList}></div>
      <button type="button" className="btn" onClick={handleFilterChange}>
        Search
      </button>
    </div>
  );
}
