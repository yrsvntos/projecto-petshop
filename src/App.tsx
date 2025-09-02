import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { DetalhesProduto } from "./pages/produto";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path:"/product/:id",
        element: <DetalhesProduto/>
      }
    ]
  }
]);

export {router}