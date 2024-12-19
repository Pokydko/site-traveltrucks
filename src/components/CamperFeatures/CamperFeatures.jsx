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
      <div className={css.detailsBox}>
        <h2 className={css.title}>Vehicle details</h2>
        <div className={css.details}>
          <span>Form</span>
          <span>{chosenCamper.form ?? "n/a"}</span>
        </div>
        <div className={css.details}>
          <span>Length</span>
          <span>{chosenCamper.length ?? "n/a"}</span>
        </div>
        <div className={css.details}>
          <span>Width</span>
          <span>{chosenCamper.width ?? "n/a"}</span>
        </div>
        <div className={css.details}>
          <span>Height</span>
          <span>{chosenCamper.height ?? "n/a"}</span>
        </div>
        <div className={css.details}>
          <span>Tank</span>
          <span>{chosenCamper.tank ?? "n/a"}</span>
        </div>
        <div className={css.details}>
          <span>Consumption</span>
          <span>{chosenCamper.consumption ?? "n/a"}</span>
        </div>
      </div>
    </div>
  );
}
