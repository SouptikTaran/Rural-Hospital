import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PatientsDashboard from "./pages/patientsDashboard";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
 
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}/>
              <Route index element={<Home/>}/>
              <Route path="patientsDashboard" element={<PatientsDashboard/>}/>
          </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
