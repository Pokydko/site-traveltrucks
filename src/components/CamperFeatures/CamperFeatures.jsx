import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors";
import css from "./CamperFeatures.module.css";

export default function CamperFeatures() {
  const { id } = useParams();
  const getOptions = (obj) => {
    const options = Object.keys(obj).filter((key) => obj[key] === true);
    if (!obj.gas) options.push("Petrol");
    if (obj.transmission === "automatic") options.push("Automatic");
    return options;
  };
  const campers = useSelector(selectCampers);
  const chosenCamper = campers?.find((camper) => camper.id === id);

  return (
    <div className={css.featuresBox}>
      <VehicleEquipment equipment={getOptions(chosenCamper)} camperId={id} />
      <h2>Vehicle details</h2>
      <div>
        <span>Form</span>
        <span></span>
        <span>Length</span>
        <span></span>
        <span>Width</span>
        <span></span>
        <span>Height</span>
        <span></span>
        <span>Tank</span>
        <span></span>
        <span>Consumption</span>
        <span></span>
      </div>
    </div>
  );
}
