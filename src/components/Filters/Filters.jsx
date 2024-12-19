import css from "./Filters.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";

export default function Filters() {
  const { filters } = useSelector((state) => state.campers);
  const optionsToShow = Object.fromEntries(
    Object.keys(filters).map((key) => [key, true])
  );

  const dispatch = useDispatch();
  const handleFilterChange = () => {
    dispatch(fetchCampers({ filter: filters }));
  };

  return (
    <div className={css.filters}>
      <p className={css.locationTitle}>Location</p>
      <input className={css.locationInput} type="text" />
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
