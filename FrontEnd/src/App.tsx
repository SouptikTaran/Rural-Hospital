import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardComponent } from "./components/dashboard";
import { PatientAuthComponent } from "./components/patient-auth";
import { PatientProfileCreationComponent } from "./components/patient-profile-creation";
import { tokenLoader, checkToken, restrict, logoutFunc } from "./utils/utils";
import NotFound from "./components/NotFound";
import { Home } from "./pages/Home";
// import { Loader } from "lucide-react";
import CreateHospital from "./pages/CreateHospital";
import { HospitalDoctorSelectionComponent } from "./components/hospital-doctor-selection";
import { BookingPage } from "./pages/BookingPage";

function App() {
  const routerConfig = [
    {
      loader: tokenLoader,
      id: 'root',
      children: [
        {
          path: "/dashboard",
          loader: checkToken,
          element: <DashboardComponent />
        },
        {
          path: "/Details",
          loader: checkToken,
          element: <PatientProfileCreationComponent />
        },
        {
          path: "/Booking",
          loader: checkToken,
          element: <BookingPage />
        },
        {
          path: "/demo",
          loader: checkToken,
          element: <HospitalDoctorSelectionComponent />
        },
        {
          path: "logout",
          loader: logoutFunc
        },
        {
          path: "createPage",
          loader: checkToken,
          element: <CreateHospital />
        },
      ]
    },
    {
      path: "login",
      loader: restrict,
      element: <PatientAuthComponent />
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

  const router = createBrowserRouter(routerConfig);

  return (
    <>

      <RouterProvider router={router} />

    </>
  );
}

export default App;