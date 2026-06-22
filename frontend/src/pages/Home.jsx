import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";
function Home() {
  /*const movies = [
    { id: 1, title: "John Wick", release_date: "2024" },
    { id: 2, title: "Terminator", release_date: "1999" },
    { id: 3, title: "IT", release_date: "2016" },
  ];*/
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handelSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to Search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };
  return (
    <div className="home">
      <form onSubmit={handelSearch} className="search-form">
        <input
          value={searchQuery}
          className="search-input"
          type="text"
          placeholder="Search a movie..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        ></input>
        <button type="submit" className="search-button">
          {" "}
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            /*movie.title.toLocaleLowerCase().startsWith(searchQuery) &&*/ <MovieCard
              movie={movie}
              key={movie.id}
            ></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
