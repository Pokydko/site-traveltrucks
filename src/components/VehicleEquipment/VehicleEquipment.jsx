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
    FullyIntegrated: "Fully Integrated",
    PanelTruck: "Panel Truck",
  };
  const usingFilters = Object.keys(filters).length !== 0;

  const getOptions = (obj) => {
    const options = Object.keys(obj).filter((key) => obj[key] === true);
    if (!usingFilters) {
      options.push(String(obj.transmission));
      options.push(String(obj.engine));
      options.push(String(obj.form));
    }
    const optionsCapitalized = options.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    );
    return optionsCapitalized;
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
          {named(option)}
        </li>
      ))}
    </ul>
  );
}
function named(option) {
  if (option === "FullyIntegrated") return "Fully Integrated";
  if (option === "PanelTruck") return "Van";
  return option;
}
