const API_KEY = "e4036b99";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(API_URL + search);
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error searching movies");
  }
};
