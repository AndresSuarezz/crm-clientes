import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//From components
import Layout from "./components/Layout";
import {action as eliminarClienteAction} from "./components/Cliente"

//From pages
import NuevoCLiente, { action as nuevoClienteAction } from "./pages/NuevoCLiente";
import Index, {loader as clientesLoader} from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from "./pages/EditarCliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Con el index true decimos que se cargue con la ruta inicial
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCLiente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },{
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
