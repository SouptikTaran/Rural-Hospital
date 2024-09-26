import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardComponent } from "./components/dashboard";
import { PatientAuthComponent } from "./components/patient-auth";
import { PatientProfileCreationComponent } from "./components/patient-profile-creation";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<PatientAuthComponent />} />
            <Route  path="/dashboard" element={<DashboardComponent />} />
            <Route path="/profile-create" element={<PatientProfileCreationComponent />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
