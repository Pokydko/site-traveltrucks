import VehicleEquipment from "../VehicleEquipment/VehicleEquipment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors";
import css from "./CamperFeatures.module.css";

export default function CamperFeatures() {
  const { id } = useParams();
  const campers = useSelector(selectCampers);
  const chosenCamper = campers?.find((camper) => camper.id === id);

  return (
    <div className={css.featuresBox}>
      <VehicleEquipment camper={chosenCamper} />
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
