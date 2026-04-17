import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "./App.css";

export default function Lista() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "usuarios"),
      orderBy("criadoEm", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsuarios(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="card">
      <h2>Usuários Cadastrados</h2>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>
              <strong>{u.nome}</strong> <br />
              Idade: {u.idade} <br />
              Cidade: {u.cidade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}