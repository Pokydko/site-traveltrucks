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
      <p>Location</p>
      <p>Filters</p>
      <h2>Vehicle equipment</h2>
      <VehicleEquipment camper={optionsToShow} filters={filters} />
      <h2>Vehicle type</h2>
      <button type="button" onClick={handleFilterChange}>
        Search
      </button>
    </div>
  );
}
