import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import Navigation from "./components/Navigation/Navigation";
import CamperFeatures from "./components/CamperFeatures/CamperFeatures";
import CamperReviews from "./components/CamperReviews/CamperReviews";
import Logo from "./components/Logo/Logo";

const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const observer = new ResizeObserver(() => {
  const htmlElement = document.documentElement;
  let scrollbarWidth = window.innerWidth - htmlElement.clientWidth;
  if (scrollbarWidth)
    htmlElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  else {
    htmlElement.style.setProperty("--scrollbar-width", `0px`);
  }
});
observer.observe(document.documentElement);

export default function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="headerContainer">
          <Logo />
          <Navigation />
          <span className="hold168px"></span>
        </div>
      </header>
      <main>
        <Suspense
          fallback={
            <PropagateLoader
              color="#e44848"
              size={15}
              aria-label="Loading page"
              loading={true}
              cssOverride={{
                textAlign: "center",
                marginTop: "15px",
                marginLeft: "37px",
              }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route
              path="/catalog/:id"
              state={location}
              element={<CamperDetailsPage />}
            >
              <Route
                path="features"
                state={location}
                element={<CamperFeatures />}
              />
              <Route
                path="reviews"
                state={location}
                element={<CamperReviews />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
