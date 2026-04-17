import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./App.css";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidade, setCidade] = useState("");

  const salvar = async () => {
    if (!nome || !idade || !cidade) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        nome,
        idade,
        cidade,
        criadoEm: serverTimestamp()
      });

      alert("Salvo com sucesso!");

      setNome("");
      setIdade("");
      setCidade("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar dados!");
    }
  };

  return (
    <div className="card">
      <h2>Cadastro de Dados</h2>

      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Idade" />
      <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade" />

      <button className="btn-primary" onClick={salvar}>
        Salvar
      </button>
    </div>
  );
}