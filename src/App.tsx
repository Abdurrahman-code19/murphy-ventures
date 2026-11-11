import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Services = lazy(() => import("./pages/Services"));
const RequestRepair = lazy(() => import("./pages/RequestRepair"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="request-repair" element={<RequestRepair />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
