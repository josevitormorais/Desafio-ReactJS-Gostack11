import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desenvolvimento React",
      url: "https://github.com.br/josevitormorais",
      techs: ["Nodejs, Reactjs, React Navite"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <div>
              <h2>Title:</h2>
              <span>{repository.title}</span>

              <h2>Url:</h2>
              <span>{repository.url}</span>

              <h2>Techs:</h2>
              <span>{repository.techs}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
