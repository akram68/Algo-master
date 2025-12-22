import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Course/Course";
import CourseDetail from "./pages/Course/CourseDetail";
import Exercises from "./pages/Exercice/Exercises";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PanelEns from "./pages/ens-panel/PanelEns";
import ScrollToTop from "./components/Scroll/ScrollToTop";

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  // routes SANS header / footer
  const hideLayout =
    pathname.startsWith("/panelens") ||
    pathname === "/login" ||
    pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!hideLayout && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Panel enseignant + sous-routes */}
          <Route path="/panelens/*" element={<PanelEns />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
