# 🎬 Catálogo de Filmes e Séries

Este projeto é uma aplicação web desenvolvida em React que permite aos usuários cadastrar, visualizar e gerenciar filmes e séries de forma simples e organizada.

A aplicação conta com autenticação de usuários e armazenamento em nuvem utilizando Firebase, garantindo que cada usuário tenha acesso apenas aos seus próprios dados.

---

## 🚀 Funcionalidades

* 🔐 Cadastro de usuário com email e senha
* 🔑 Login e logout
* 🎬 Cadastro de filmes e séries
* 📋 Listagem dos itens cadastrados
* 🗑️ Remoção de itens
* ⚡ Atualização em tempo real
* 👤 Dados vinculados ao usuário logado

---

## 🛠️ Tecnologias Utilizadas

* React
* Firebase Authentication
* Firestore Database
* JavaScript (ES6+)

---

## 📂 Estrutura do Projeto

```bash
src/
│── App.jsx
│── Auth.jsx
│── firebase.js
│── App.css
```

---

## 🔥 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone (https://github.com/ferreirajoao-fatec/Provas_Danilo.git)
```

2. Acesse a pasta:

```bash
cd nome-do-projeto
```

3. Instale as dependências:

```bash
npm install
```

4. Configure o Firebase:

* Crie um projeto no Firebase
* Ative o Authentication (Email/Senha)
* Ative o Firestore Database
* Adicione suas credenciais no arquivo `firebase.js`

5. Execute o projeto:

```bash
npm run dev
```

ou

```bash
npm start
```

---

## 🔐 Regras do Firestore

Certifique-se de utilizar regras de segurança adequadas, como:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /filmes/{docId} {
      allow read: if request.auth != null &&
        request.auth.uid == resource.data.userId;

      allow create: if request.auth != null &&
        request.auth.uid == request.resource.data.userId;

      allow delete: if request.auth != null &&
        request.auth.uid == resource.data.userId;

      allow update: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }

    match /usuarios/{userId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == userId;
    }

  }
}
```

---

## ⚠️ Observações Importantes

* O sistema exige login para acessar o dashboard
* Cada usuário visualiza apenas seus próprios dados
* Os dados são armazenados no Firestore em tempo real

---

## 📌 Adendo

Desconsiderar o arquivo:

```
prova0417
```

Este arquivo não faz parte da versão final do projeto e não deve ser avaliado.

---

## 👨‍💻 Autor

Desenvolvido por João Gabriel Ferreira
Curso: Desenvolvimento de Software Multiplataforma – FATEC Matão
