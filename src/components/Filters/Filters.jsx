import css from "./Filters.module.css";
import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../redux/campers/slice";

export default function Filters() {
  const { campersLocation, filters, camperForms } = useSelector(
    (state) => state.campers
  );
  const optionsToShow = (obj) =>
    Object.fromEntries(Object.keys(obj).map((key) => [key, true]));

  const dispatch = useDispatch();

  // const handleFilterChange = () => {};

  const handleInputChange = (e) => {
    dispatch(setLocation(e.target.value.trim()));
  };

  return (
    <div className={css.filters}>
      <p className={css.locationTitle}>Location</p>
      <div className={css.locationInputWrapper}>
        <input
          className={css.locationInput}
          type="text"
          placeholder="City"
          onChange={handleInputChange}
          value={campersLocation}
        />
        <svg className={css.locationIco}>
          <title>Location</title>
          <use href="/sprite.svg#icon-location"></use>
        </svg>
      </div>
      <p className={css.filtersTitle}>Filters</p>
      <h2 className={css.equipmentTitle}>Vehicle equipment</h2>
      <VehicleEquipment camper={optionsToShow(filters)} filters={filters} />
      <h2 className={`${css.equipmentTitle} ${css.marginForEquipment}`}>
        Vehicle type
      </h2>
      <div className={css.vehicleForm}>
        <VehicleEquipment
          camper={optionsToShow(camperForms)}
          filters={camperForms}
        />
      </div>
      {/* <button type="button" className="btn" onClick={handleFilterChange}>
        Search
      </button> */}
    </div>
  );
}
