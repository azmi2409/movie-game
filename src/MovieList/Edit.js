import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMovies, editMovie } from "../Lib/helper";
import StarRating from "react-svg-star-rating";
import { MovieContext } from "./MovieContext";

const EditMovie = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { filteredMovies,refetchMovies } = useContext(MovieContext);
  const thisMovie = filteredMovies.find((v) => v.id === id);
  const [movie, setMovie] = useState(thisMovie || {});

  useEffect(() => {
    if (!thisMovie) {
      getMovies(id).then((data) => {
        setMovie(data);
      }).then(document.title = `Edit Movie`);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    movie({ movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editMovie(movie);
    refetchMovies();
    if (res) {
      return navigate(`/movies/${movie.id}`);
    }
  };

  const handleRating = (rating) => {
    rating = rating * 2
    setMovie({ ...movie, rating });
  };

  return (
    <div className="flex items-center content-center flex-col gap-2 p-5 h-full text-base-content">
    <h1 className="text-center text-3xl mb-10 p-2 font-extrabold text-current-focus">
      Edit Movie : <span>{movie.title}</span>
    </h1>
    <form
      className="grid grid-cols-2 gap-2 mt-3 text-base-content"
      onSubmit={handleSubmit}
    >
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Title
          </span>
          <input
            name="title"
            type="text"
            placeholder={movie.title}
            className="input input-bordered"
            value={movie.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Poster
          </span>
          <input
            name="image_url"
            type="text"
            placeholder={movie.image_url}
            className="input input-bordered"
            value={movie.image_url}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Genre
          </span>
          <input
            name="genre"
            type="text"
            placeholder={movie.genre}
            className="input input-bordered"
            value={movie.genre}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Duration
          </span>
          <input
            name="duration"
            type="number"
            placeholder={movie.duration}
            className="input input-bordered"
            value={movie.duration}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Review
          </span>
          <input
            name="review"
            type="text"
            placeholder={movie.review}
            className="input input-bordered"
            value={movie.review}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Year
          </span>
          <input
            name="year"
            type="number"
            placeholder={movie.year}
            className="input input-bordered"
            value={movie.year}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
          <span className="text-base-content text-center bg-base-100 rounded-xl" style={{ width: 100 }}>
            Description
          </span>
          <textarea
            name="description"
            type="text"
            placeholder={movie.description}
            className="input input-bordered h-32"
            value={movie.description}
            onChange={handleChange}
          />
      </div>
      <div className="form-control">
        <label className="input-group">
          <span className="text-base-content" style={{ width: 100 }}>
            Rating
          </span>
          <StarRating unit="half" initialRating={1} count={5} containerClassName="bg-neutral" handleOnClick={rating => handleRating(rating)}/>
        </label>
      </div>
      <div className="form-control mt-3 col-span-2 items-center">
        <button
          type="submit"
          className="btn btn-primary rounded-lg bg-base-200 w-52 text-base-content normal-case"
        >
          Post
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditMovie;
