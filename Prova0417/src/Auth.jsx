import { useState } from "react";
import { auth } from "./firebase";
import "./App.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado!");
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card" style={{ width: "350px" }}>
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button className="btn-primary" onClick={handleSubmit}>
        {isLogin ? "Entrar" : "Cadastrar"}
      </button>

      <button
        className="btn-secondary"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Criar conta" : "Já tenho conta"}
      </button>
    </div>
  );
}