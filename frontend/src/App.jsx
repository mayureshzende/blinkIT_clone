import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../src/redux/productSlice.js";
const DEV_URL = import.meta.env.VITE_APP_API_URL;
function App() {
  // const [productsData, setProductsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const products = await fetch(DEV_URL + "/api/products", {
          method: "GET",
        });
        const productsData = await products.json();
        const allProducts = await JSON.parse(productsData.data);
        // setProductsData(allProducts);
        dispatch(getAllProducts(allProducts));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          removeDelay: 1000,
        }}
      />
      <Header />
      <main className="pt-20 bg-mainbg h-[100vh] max-h-[100vh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
