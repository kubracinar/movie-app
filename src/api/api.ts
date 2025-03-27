const API_URL = "https://www.omdbapi.com/";
const API_KEY = "84c0c7fb";

export const fetchMovies = async (
  query = "Pokemon",
  year = "",
  type = "",
  page = 1
) => {
  const response = await fetch(
    `${API_URL}?s=${query}&y=${year}&type=${type}&page=${page}&apikey=${API_KEY}`
  );
  const data = await response.json();

  if (!data.Search) return { Search: [], totalResults: "0", Response: "False" };

  // IMDb puanını almak için her film için ayrı API isteği yapalım
  const moviesWithRatings = await Promise.all(
    data.Search.map(async (movie: any) => {
      const details = await fetchMovieDetails(movie.imdbID);
      return { ...movie, imdbRating: details.imdbRating || "N/A" }; // IMDb puanı ekle
    })
  );

  return { ...data, Search: moviesWithRatings };
};

export const fetchMovieDetails = async (id: string) => {
  const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
  return response.json();
};
