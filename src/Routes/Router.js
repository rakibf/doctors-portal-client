import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AddNewDoctor from "../Pages/Dashboard/AddNewDoctor/AddNewDoctor";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointments from "../Pages/Dashboard/MyAppointments/MyAppointments";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Users from "../Pages/Dashboard/Users/Users";
import ErrorPage from "../Pages/ErrorPage/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Signup from "../Pages/Signup/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyAppointments />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params: { id } }) =>
          fetch(`http://localhost:5000/bookings/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "add-doctor",
        element: (
          <AdminRoute>
            <AddNewDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "manage-doctors",
        element: (
          <AdminRoute>
            <ManageDoctors />
          </AdminRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
