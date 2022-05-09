import { MovieProvider } from "./MovieContext";
import { Routes, Route } from "react-router-dom";
import MovieList from "./List";
import CreateMovie from "./Create";
import MovieDetails from "./Detail";
import EditMovie from "./Edit";

const Movies = () => {
  return (
    <MovieProvider>
      <Routes>
        <Route index element={<MovieList />} />
        <Route path="create" element={<CreateMovie />} />
        <Route path=":id" element={<MovieDetails />} />
        <Route path=":id/edit" element={<EditMovie />} />
      </Routes>
    </MovieProvider>
  );
};

export default Movies;
