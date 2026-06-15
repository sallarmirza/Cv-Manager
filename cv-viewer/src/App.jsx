import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CVProvider } from "./context/CVContext";
import { Home } from "./components/layout/Home";
import { Builder } from "./pages/Builder";
import { Reviewer } from "./pages/Reviewer";

export default function App() {
  return (
    <CVProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Navigate to="/builder" replace />} />
            <Route path="builder" element={<Builder />} />
            <Route path="reviewer" element={<Reviewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CVProvider>
  );
}