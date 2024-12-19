import Container from "../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchCampers } from "../redux/campers/operations";
import { selectCampers } from "../redux/campers/selectors";
import css from "./CamperDetailsPage.module.css";
import ImageModal from "../components/ImageModal/ImageModal";
import BookingForm from "../components/BookingForm/BookingForm";

export default function CamperDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.campers);

  const campers = useSelector(selectCampers);
  const chosenCamper = campers?.find((camper) => camper.id === id);

  if (!chosenCamper && !loading && !error) {
    dispatch(fetchCampers({ id: Number(id) }));
  }
  const [location] = useState(useLocation());
  const backLinkHref = location.state ?? "/catalog";
  const [modalContent, setModalContent] = useState(false);
  if (error) {
    return (
      <Container>
        <Link to={backLinkHref} className={css.goBackLink}>
          ← Go back
        </Link>
        <p>Can't find camper with ID {id}.</p>
      </Container>
    );
  }
  if (!chosenCamper) {
    return;
  }

  const handleClick = (foto) => {
    setModalContent({
      href: foto.original,
    });
  };

  return (
    <Container>
      <div className={css.camperDetailsPage}>
        <h1>{chosenCamper.name}</h1>
        <ul className={css.camperGallery}>
          {chosenCamper.gallery.map((foto) => (
            <li
              key={foto.thumb}
              className={css.thumbWrp}
              onClick={() => handleClick(foto)}
            >
              <img
                src={foto.thumb}
                alt={chosenCamper.description}
                className={css.camperThumb}
              />
            </li>
          ))}
        </ul>
        <p className={css.descriptionNearGallery}>{chosenCamper.description}</p>
        <div className={css.additionInfo}>
          <Link to={`features`}>Features</Link>
          <Link to={`reviews`}>Reviews</Link>
        </div>
        <div className={css.boxAndForm}>
          <div className={css.box}>
            <Outlet />
          </div>
          <BookingForm id={id} />
        </div>
        <ImageModal
          isOpen={modalContent !== false}
          onClose={() => setModalContent(false)}
        >
          {modalContent}
        </ImageModal>
      </div>
    </Container>
  );
}
