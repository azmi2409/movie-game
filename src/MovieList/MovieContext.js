import { useState, createContext, useEffect } from "react";
import { getMovies } from "../Lib/helper";
import { deleteMovie } from "../Lib/helper";
import { useNavigate } from "react-router-dom";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const eraseMovie = async(id) => {
    const res = await deleteMovie(id);
    refetchMovies();
    return navigate("/");
  };

  const filterMovie = (e) => {
    const { value } = e.target;
    const newMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(newMovies);
  }

  const refetchMovies = async () => {
    const movies = await getMovies();
    setMovies(movies);
    setFilteredMovies(movies);
  }

  const sortMovies = (value) => {
    const newMovies = [...movies];
    newMovies.sort((a, b) => {
      if (value === "title") {
        return a.title.localeCompare(b.title);
      } else if (value === "year") {
        return a.year - b.year;
      } else if (value === "rating") {
        return b.rating - a.rating;
      }
    });
    setFilteredMovies(newMovies);
  }

  useEffect(() => {
    getMovies().then((data) => {
      if (data) {
        setMovies(data);
        setFilteredMovies(data);
      }
    });
  }, []);

  return (
    <MovieContext.Provider value={{ refetchMovies , filterMovie , filteredMovies , eraseMovie, sortMovies}}>
      {children}
    </MovieContext.Provider>
  );
};
