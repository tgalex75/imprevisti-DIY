import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/regContext";


/*     // Salvare lo stato "theme" nel localStorage
    const getFromLocalStorage = () => {
        return localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : "dark-mode";
    };

    // Funzione che aggiorna il tema in base allo State

    const [theme, setTheme] = useState(getFromLocalStorage());

    // Funzione che cambia il tema in base al valore dello State

    const cambiaTema = () => {
        theme === "light-mode" ? setTheme("dark-mode") : setTheme("light-mode");
    };

    // Al cambio ddello state "theme" verrà attaccata una classe al TAG html
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);
     */

function App() {
  const {theme} = useContext(CartContext)
  return (
    <main className="h-dvh w-dvh overflow-hidden bg-[--clr-bg] text-[--clr-txt] transition-all duration-700" data-theme={theme}>
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
