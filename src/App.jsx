import { Route, Routes } from "react-router";
import Card from "./components/Card";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* <div className="flex flex-col items-center p-3">
        <h1 className="bg-green-100 rounded-xl mb-3 p-3 w-fit items-center">
          Bosta E-Commerce
        </h1>
        <Routes>
          <Route path="/" element={<Card />} />
        </Routes>
      </div> */}

        {/* <Card /> */}

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
