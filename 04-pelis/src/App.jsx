import { useState } from "react";
import "./App.css";

import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

const API_KEY = "e4036b99";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=Avengers`;




function App() {

  const {movies} = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { query } = Object.fromEntries(
      new window.FormData(event.target)
    )
    // if (query === ''){

    // }
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name="query" type="text" placeholder="Avengers, Matrix, Shrek" />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
