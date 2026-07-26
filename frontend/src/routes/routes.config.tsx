/* eslint-disable react-refresh/only-export-components */

import {
  Dashboard,
  Inventory2,
  ShoppingCart,
  AddShoppingCart,
} from "@mui/icons-material";

import { lazy } from "react";

interface RouteConfig {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  element: React.ReactNode;
  section?: "management" | "results";
}

const DashboardPage = lazy(
  () => import("../pages/Dashboards"),
);

const ProductsPage = lazy(
  () => import("../pages/Products"),
);

const OrdersPage = lazy(
  () => import("../pages/Orders"),
);

const OrderDetailsPage = lazy(
  () => import("../pages/OrderDetails"),
);

const CreateOrderPage = lazy(
  () => import("../pages/CreateOrder"),
);

export const routesConfig: RouteConfig[] = [
  {
    path: "/products",
    label: "Products",
    icon: <Inventory2 />,
    element: <ProductsPage />,
    section: "management",
  },
  {
    path: "/orders",
    label: "Orders",
    icon: <ShoppingCart />,
    element: <OrdersPage />,
    section: "management",
  },
  {
    path: "/orders/new",
    label: "New Order",
    icon: <AddShoppingCart />,
    element: <CreateOrderPage />,
    section: "management",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <Dashboard />,
    element: <DashboardPage />,
    section: "results",
  },
  {
    path: "/orders/:id",
    element: <OrderDetailsPage />,
  },
];