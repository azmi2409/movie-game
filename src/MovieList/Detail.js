import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMovies } from "../Lib/helper";
import StarRating from "react-svg-star-rating";
import { MovieContext } from "./MovieContext";

const MovieDetails = () => {
  const id = useParams().id;
  const { filteredMovies, eraseMovie } = useContext(MovieContext);
  const thisMovie = filteredMovies.find((v) => v.id === id);
  const [movie, setMovie] = useState(thisMovie || []);
  useEffect(() => {
    if (!thisMovie) {
      getMovies(id).then((res) => {
        setMovie(res);
        document.title = `${movie.title}`;
      });
    }
  }, [id]);

  return (
    <div className="grid grid-cols-2 mt-10 gap-5 overflow-y-hidden">
      <div className="flex flex-col content-center items-end justify-items-center text-center">
        <div className="flex content-center items-center flex-col w-2/3">
          <h1 className="text-2xl text-current font-bold w-1/2">
            {movie.title}
          </h1>
          <figure className="mt-1">
            <img
              className="h-80 my-5 object-contain"
              src={movie.image_url}
              alt="pict"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="flex flex-row gap-2 content-center items-center justify-center w-2/3 btn-group">
          <button className="btn btn-primary">
            <Link to={`edit`}>Edit</Link>
          </button>
          <button
            onClick={() => eraseMovie(movie.id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col content-center items-start justify-items-center text-center">
        <h2 className="text-lg text-current font-bold w-1/2 mb-10">
          Movie Details
        </h2>
        <article className="mt-2 text-justify flex gap-2 flex-col">
          <p className="text-lg">Release Year : {movie.year}</p>
          <p className="text-lg">Genre : {movie.genre}</p>
          <p className="text-lg">Duration : {movie.duration}</p>
          <p className="text-lg">Review : {movie.review}</p>
          <p className="text-lg">
            Rating :{" "}
            <StarRating
              unit="half"
              size={15}
              initialRating={parseFloat(movie.rating / 2)}
              isReadOnly
              count={5}
              containerClassName="flex"
            />
          </p>
        </article>

        <div className="h-12" />
        <article className="mt-5">
          <p className="text-md w-64 text-justify">
            <span className="text-lg font-bold">Plot : </span>
            {movie.description}
          </p>
        </article>
      </div>
    </div>
  );
};

export default MovieDetails;
