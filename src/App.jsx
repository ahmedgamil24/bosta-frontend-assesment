import { Route, Routes } from "react-router";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
