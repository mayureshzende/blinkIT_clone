import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import Home from "./pages/Home.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { reduxStore } from "./redux/reduxStore.js";
import { Provider } from "react-redux";
import PageNotFound from "./pages/PageNotFound.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu/:productId" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="newProduct" element={<NewProduct />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <RouterProvider router={router} />
  </Provider>
);
