import { useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // 🔐 LOGIN / CADASTRO
  const handleSubmit = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      if (isLogin) {
        // 🔑 LOGIN
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado!");
      } else {
        // 🆕 CADASTRO
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

        const user = userCredential.user;

        // 🔥 SALVAR NO FIRESTORE
        await setDoc(doc(db, "usuarios", user.uid), {
          email: user.email,
          criadoEm: serverTimestamp()
        });

        alert("Conta criada com sucesso!");
      }

      // limpa campos
      setEmail("");
      setSenha("");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="card" style={{ width: "350px" }}>
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>

      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Digite sua senha"
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
        {isLogin ? "Criar uma conta" : "Já tenho conta"}
      </button>
    </div>
  );
}