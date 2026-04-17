import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

import Auth from "./Auth";
import Formulario from "./Formulario";
import Lista from "./Lista";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // 🔒 NÃO LOGADO
  if (!user) {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }

  // ✅ LOGADO → DASHBOARD
  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>Dashboard</h2>

        <button className="btn-danger" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>

      <div className="main">
        <div className="header">
          <h1>Painel</h1>
          <div className="user-info">{user.email}</div>
        </div>

        <div className="cards">
          <Formulario />
          <Lista />
        </div>
      </div>
    </div>
  );
}

export default App;