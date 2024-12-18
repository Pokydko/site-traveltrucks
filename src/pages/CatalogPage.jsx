import Container from "../components/Container/Container.jsx";
import css from "./CatalogPage.module.css";
import CatalogList from "../components/CatalogList/CatalogList.jsx";

export default function CatalogPage() {
  return (
    <Container>
      <CatalogList />
    </Container>
  );
}
