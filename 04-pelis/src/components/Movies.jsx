function ListOfMovies({ movies }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-* gap-4 sm:p-4">
      {movies.map((movie) => (
        // <li className="movie" key={movie.id}>
        //   <h3>{movie.title}</h3>
        //   <p>{movie.year}</p>
        //   <img src={movie.poster} alt="" />
        // </li>

        <div
          key={movie.id}
          className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img className="rounded-t-lg w-full" src={movie.poster} alt="" />
          </a>
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {movie.title}
            </h5>
          
            <span className=" bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            {movie.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function NoMoviesResults() {
  return (
    <div
      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      No se encontraron películas para esta búsqueda
    </div>
  );
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}
