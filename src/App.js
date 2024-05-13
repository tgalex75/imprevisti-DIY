import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/regContext";

function App() {
  const {themeValue} = useContext(CartContext)
  return (
    <main className="h-dvh w-dvh overflow-hidden bg-[--clr-bg] text-[--clr-txt] transition-all duration-700" data-theme={themeValue}>
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
