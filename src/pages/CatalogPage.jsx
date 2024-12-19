import Container from "../components/Container/Container.jsx";
import css from "./CatalogPage.module.css";
import CatalogList from "../components/CatalogList/CatalogList.jsx";
import Filters from "../components/Filters/Filters.jsx";

export default function CatalogPage() {
  return (
    <Container direction="row">
      <Filters />
      <CatalogList />
    </Container>
  );
}
