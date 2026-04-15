import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
  const [imagem, setImagem] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  // 🔹 Carregar do localStorage
  useEffect(() => {
    const filmesSalvos = localStorage.getItem("filmes");
    if (filmesSalvos) {
      setFilmes(JSON.parse(filmesSalvos));
    }
  }, []);

  // 🔹 Salvar automaticamente
  useEffect(() => {
    localStorage.setItem("filmes", JSON.stringify(filmes));
  }, [filmes]);

  // 🔹 Upload de imagem
  const handleImagem = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagem(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const adicionarFilme = (e) => {
    e.preventDefault();

    if (!nome || !genero || !tipo) return;

    const novo = {
      id: Date.now(),
      nome,
      genero,
      tipo,
      ano,
      nota,
      imagem
    };

    setFilmes([...filmes, novo]);

    setNome("");
    setGenero("");
    setTipo("");
    setAno("");
    setNota("");
    setImagem("");
  };

  const removerFilme = (id) => {
    setFilmes(filmes.filter((f) => f.id !== id));
  };

  const generos = ["Todos", ...new Set(filmes.map((f) => f.genero))];

  const listaFiltrada =
    filtro === "Todos"
      ? filmes
      : filmes.filter((f) => f.genero === filtro);

  return (
    <div className="app">

      {/* 🔝 StatusBar */}
      <div className="statusbar">
        Catálogo de Filmes ou Séries
      </div>

      <div className="main">
        <form onSubmit={adicionarFilme} className="form-wrapper">

          {/* NOME */}
          <div className="card">
            <h3 className="card-title">🎬 Nome</h3>
            <input
              placeholder="Ex: Interestelar"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* CLASSIFICAÇÃO */}
          <div className="card">
            <h3 className="card-title">🎭 Classificação</h3>

            <div className="card-grid">
              <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Gênero</option>
                <option>Ação</option>
                <option>Comédia</option>
                <option>Drama</option>
                <option>Ficção Científica</option>
                <option>Desenho Animado</option>
              </select>

              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Tipo</option>
                <option>Filme</option>
                <option>Série</option>
              </select>
            </div>
          </div>

          {/* DETALHES */}
          <div className="card">
            <h3 className="card-title">📊 Detalhes</h3>

            <div className="card-grid">
              <input
                type="number"
                placeholder="Ano"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              />

              <input
                type="number"
                placeholder="Nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
              />
            </div>
          </div>

          {/* UPLOAD DE IMAGEM */}
          <div className="card">
            <h3 className="card-title">🖼️ Upload de Imagem</h3>

            <input
              type="file"
              accept="image/*"
              onChange={handleImagem}
            />

            {imagem && (
              <img src={imagem} alt="preview" className="preview-img" />
            )}
          </div>

          {/* BOTÃO */}
          <button type="submit" className="btn-main">
            + Adicionar ao Catálogo
          </button>
        </form>

        {/* FILTROS */}
        <div className="filters">
          {generos.map((g, i) => (
            <button
              key={i}
              className={filtro === g ? "active" : ""}
              onClick={() => setFiltro(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* LISTA */}
        <div className="films-grid">
          {listaFiltrada.length === 0 ? (
            <p className="empty">Nenhum filme cadastrado</p>
          ) : (
            listaFiltrada.map((f) => (
              <div className="film-card" key={f.id}>

                {f.imagem && (
                  <img
                    src={f.imagem}
                    alt={f.nome}
                    className="film-img"
                  />
                )}

                <h3>{f.nome}</h3>
                <p>{f.genero}</p>
                <span>{f.tipo}</span>
                <small>
                  {f.ano} ⭐ {f.nota}
                </small>

                <button onClick={() => removerFilme(f.id)}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        João Gabriel Ferreira - {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}

export default App;