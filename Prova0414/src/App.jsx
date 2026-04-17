import "./App.css";
import { useState, useEffect } from "react";

import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import Auth from "./Auth";

function App() {
  const [user, setUser] = useState(null);
  const [filmes, setFilmes] = useState([]);

  // FORMULÁRIO
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("Filme");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");

  // 🔐 VERIFICAR USUÁRIO LOGADO
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 CARREGAR FILMES DO FIRESTORE
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "filmes"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setFilmes(lista);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ ADICIONAR FILME
  const adicionarFilme = async () => {
    if (!nome || !genero || !ano || !nota) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await addDoc(collection(db, "filmes"), {
        nome,
        genero,
        tipo,
        ano,
        nota,
        userId: user.uid,
        criadoEm: serverTimestamp()
      });

      setNome("");
      setGenero("");
      setAno("");
      setNota("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar filme!");
    }
  };

  // ❌ REMOVER FILME
  const removerFilme = async (id) => {
    try {
      await deleteDoc(doc(db, "filmes", id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔒 SE NÃO ESTIVER LOGADO
  if (!user) {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }

  // 🎬 DASHBOARD
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🎬 Catálogo</h2>

        <button
          className="btn-danger"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <h1>Meus Filmes e Séries</h1>
          <div className="user-info">{user.email}</div>
        </div>

        {/* CONTEÚDO */}
        <div className="cards">

          {/* FORMULÁRIO */}
          <div className="card">
            <h2>Adicionar</h2>

            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              placeholder="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option>Filme</option>
              <option>Série</option>
            </select>

            <input
              placeholder="Ano"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />

            <input
              placeholder="Nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />

            <button className="btn-primary" onClick={adicionarFilme}>
              Salvar
            </button>
          </div>

          {/* LISTA */}
          <div className="card">
            <h2>Lista</h2>

            {filmes.length === 0 ? (
              <p>Nenhum item cadastrado</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px"
                }}
              >
                {filmes.map((f) => (
                  <div key={f.id} className="card">
                    <h3>{f.nome}</h3>
                    <p>{f.genero}</p>
                    <p>{f.tipo}</p>
                    <p>{f.ano}</p>
                    <p>⭐ {f.nota}</p>

                    <button
                      className="btn-danger"
                      onClick={() => removerFilme(f.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;