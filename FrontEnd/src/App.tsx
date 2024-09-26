import { createBrowserRouter , RouterProvider} from "react-router-dom";
import { DashboardComponent } from "./components/dashboard";
import { PatientAuthComponent } from "./components/patient-auth";
import { PatientProfileCreationComponent } from "./components/patient-profile-creation";
import { tokenLoader, checkToken , restrict , logoutFunc } from "./utils/utils";
import NotFound from "./components/NotFound";
import { Home } from "./pages/Home";


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
          path:"/Details",
          loader : checkToken,
          element : <PatientProfileCreationComponent />
        },
        {
          path :"logout",
          loader : logoutFunc 
        }
      ]
    },
    {
      path: "login",
      loader:restrict ,   
      element: <PatientAuthComponent />
    },
    {
      path :"/",
      element : <Home />
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