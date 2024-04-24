import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <main className="w-dvh h-dvh overflow-hidden">
      <Router>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Router>
      <Sfondo />
    </main>
  );
}

export default App;
