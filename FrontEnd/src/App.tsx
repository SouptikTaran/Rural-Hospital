import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import PatientAuth from "./pages/PatientAuth";
import Dashboard from "./pages/PatientDashboard";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<PatientAuth />} />
            <Route  path="dash" element={<Dashboard />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
