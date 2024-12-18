import css from "./VehicleEquipment.module.css";

export default function VehicleEquipment({ equipment, camperId }) {
  const decipher = {
    Automatic: "Automatic transmission",
    engine: "Engine",
    AC: "Air Conditioning",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    TV: "Television",
    radio: "Radio",
    refrigerator: "Refrigerator",
    microwave: "Microwave",
    gas: "Gas System",
    Petrol: "Petrol System",
    water: "Water System",
  };

  return (
    <ul className={`${css.equipmentList} ${css.scrollbar}`}>
      {equipment.map((option) => (
        <li key={`${camperId}${option}`} className={css.equipmentItem}>
          <svg className={css.equipmentSvg}>
            <title>{decipher[option]}</title>
            <use href={`/sprite.svg#icon-${option}`}></use>
          </svg>
          {option}
        </li>
      ))}
    </ul>
  );
}
