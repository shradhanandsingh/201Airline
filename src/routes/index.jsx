import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import FlightList from "../pages/FlightList";
import PassengerDetails from "../pages/PassengerDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <FlightList />
      },
      {
        path: "flight_list",
        element: <FlightList />
      },
       {
        path: "passenger_list/:id",
        element: <PassengerDetails />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />
          }
        ]
      }
    ]
  }
]);