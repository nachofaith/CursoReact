  import { useState, useRef, useEffect, useCallback } from "react";
  import { Movies } from "./components/Movies";
  import { useMovies } from "./hooks/useMovies";
  import debounce from "just-debounce-it";

  function useSearch() {
    const [search, updateSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === "";
        return;
      }

      if (search === "") {
        setError("No se puede buscar una película vacía");
        return;
      }

      if (search.match(/^\d+$/)) {
        setError("No se puede buscar una película con un número");
        return;
      }

      if (search.length < 3) {
        setError("La búsqueda debe tener al menos 3 caracteres");
        return;
      }

      setError(null);
    }, [search]);

    return { search, updateSearch, error };
  }

  function App() {
    const [sort, setSort] = useState(false);
    const { search, updateSearch, error } = useSearch();
    const { movies, loading, getMovies } = useMovies({ search, sort });

    const debounceGetMovies = useCallback(
      debounce((search) => {
        console.log("search", search);
        getMovies({ search });
      }, 300),
      [getMovies]
    );

    const handleSubmit = (event) => {
      event.preventDefault();
      getMovies({ search });
    };

    const handleSort = () => {
      setSort(!sort);
    };
    const handleChange = (event) => {
      const newSearch = event.target.value;
      updateSearch(newSearch);
      debounceGetMovies(newSearch);
    };

    return (
      <div className="container mx-auto p-20">
        <header className="flex flex-col">
          <h1 className="text-4xl text-center font-bold p-12">
            Buscador de películas
          </h1>

          <form className="" onSubmit={handleSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={handleChange}
                value={search}
                name="query"
                type="text"
                className={
                  error
                    ? "outline outline-offset-2 outline-red-500 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    : "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                placeholder="Avengers, Matrix, Shrek"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
            <div className="flex items-center mb-4 pt-4">
              <input
                id="default-checkbox"
                type="checkbox"
                onChange={handleSort}
                checked={sort}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ordenar Alfabéticamente
              </label>
            </div>

            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {error}
              </div>
            )}
          </form>
        </header>

        <main className="">
          {loading ? <p>Cargando</p> : <Movies movies={movies} />}
        </main>
      </div>
    );
  }

  export default App;
