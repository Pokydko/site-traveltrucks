import css from "./VehicleEquipment.module.css";
import { setFilter } from "../../redux/campers/slice";
import { useDispatch } from "react-redux";

export default function VehicleEquipment({
  camper = {},
  filters = {},
  scrollbar = false,
}) {
  const dispatch = useDispatch();
  const decipher = {
    AC: "Air Conditioning",
    TV: "Television",
    Gas: "Gas System",
    Water: "Water System",
    Automatic: "Automatic transmission",
    Manual: "Manual transmission",
    Petrol: "Petrol System",
    Diesel: "Diesel System",
    Hybrid: "Hybrid System",
  };
  const usingFilters = Object.keys(filters).length !== 0;

  const getOptions = (obj) => {
    const capitalizeFirstLetter = (arr) =>
      arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

    const options = Object.keys(obj).filter((key) => obj[key] === true);
    if (!obj.gas && !usingFilters) options.push("Petrol");
    if (obj.transmission === "automatic") options.push("Automatic");
    return capitalizeFirstLetter(options);
  };
  const equipment = getOptions(camper);

  return (
    <ul
      className={`${usingFilters ? css.filtersStylesList : css.equipmentList} ${scrollbar && css.scrollbar}`}
    >
      {equipment.map((option) => (
        <li
          key={`${camper.id}${option}`}
          onClick={() => {
            if (usingFilters) dispatch(setFilter(option));
          }}
          className={`${usingFilters ? css.filtersStylesItem : css.equipmentItem} ${filters[option] && css.active}`}
        >
          <svg className={css.equipmentSvg}>
            <title>{decipher[option] || option}</title>
            <use href={`/sprite.svg#icon-${option}`}></use>
          </svg>
          {option}
        </li>
      ))}
    </ul>
  );
}
