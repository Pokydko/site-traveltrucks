import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <Suspense
          fallback={
            <RingLoader
              color="#909080ff"
              size={40}
              aria-label="Loading Spinner"
              loading={true}
              cssOverride={{
                margin: "0 auto",
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
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}