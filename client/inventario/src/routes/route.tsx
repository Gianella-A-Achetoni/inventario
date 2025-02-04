/**
 * @fileoverview Configuración de rutas principales de la aplicación 
 * @module Routes
 * @version 1.0.0
 */

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../page/landing/landing";
import Layaud from "../page/Layaud/Layaud";
import Perfil from "../page/perfil/perfil";
import Inventario from "../page/inventario/inventario";
import Login from "../page/Ingreso/Login";
import Register from "../page/Ingreso/Register";
import Home from "../page/home/home";
import Proveedores from "../page/Proveedores/Proveedores";
import Reportes from "../page/Reportes/Reportes";
import ProtectedRoute from "./protectedRoute";
import RouteRedirect from "./routeRedirect";
import Error404 from "../page/err/error404";


/**
 * @constant
 * @type {import('react-router-dom').RouteObject[]}
 * @description Router principal que contiene todas las rutas de la aplicación
 */
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <Error404/>,
    },
    {
        path: "/ingreso",
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
        errorElement: <Error404/>,
    },
    {
        path: "/inventario",
        element:(
            <ProtectedRoute>
                <Layaud />
            </ProtectedRoute>
        ),  
        children: [
            {
                index: true,
                element: <RouteRedirect to="home" />
            },
            {

                path: "perfil",
                element: <Perfil />,
            },
            {
                path: "inventario",
                element: <Inventario />,
            },
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "proveedores",
                element: <Proveedores/>
            },
            {
                path: "reportes",
                element: <Reportes/>
            },
        ],
        errorElement: <Error404/>,
    },
]);

export default router;
