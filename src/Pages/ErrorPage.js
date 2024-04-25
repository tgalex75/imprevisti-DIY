import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const styles = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: "10",
  };
  return (
    <div style={styles} className="flex flex-col items-center">
      <MdErrorOutline size={56} />
      <h1>Questa pagina non esiste</h1>
      <Link
        to="/home"
        style={{
          fontSize: "1.2rem",
          color: "var(--clr-primary)",
          fontWeight: "600",
          padding: "2rem",
        }}
      >
        <p className="hover:underline">Torna alla Homepage</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
