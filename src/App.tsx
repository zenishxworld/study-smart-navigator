import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import UniversityDetail from "./pages/UniversityDetail";
import Transparency from "./pages/Transparency";
import ROICalculator from "./pages/ROICalculator";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:country/:slug" element={<UniversityDetail />} />
      <Route path="/transparency" element={<Transparency />} />
      <Route path="/roi-calculator" element={<ROICalculator />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
