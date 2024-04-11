import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import Prepartita from "../Pages/Prepartita";
import Settimana from "../Pages/Settimana";
import MediaOverall from "../Pages/MediaOverall";
import SerieNegativa from "../Pages/SerieNegativa";
import EditorImprevisti from "../Pages/EditorImprevisti";
import RinnoviIngaggiMercato from "../Pages/RinnoviIngaggiMercato";
import ErrorPage from "../Pages/ErrorPage";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/prepartita" element={<Prepartita />} />
                <Route path="/settimana" element={<Settimana />} />
                <Route path="/editor-imprevisti" element={<EditorImprevisti />} />
                <Route path="/calcolo-media" element={<MediaOverall />} />
                <Route path="/serie-negativa" element={<SerieNegativa />} />
                <Route path="/rinnovi" element={<RinnoviIngaggiMercato tipoImprevisto="Rinnovi" />} />
                <Route path="/ingaggi" element={<RinnoviIngaggiMercato tipoImprevisto="Ingaggi" />} />
                <Route path="/mercato" element={<RinnoviIngaggiMercato tipoImprevisto="Mercato" />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
