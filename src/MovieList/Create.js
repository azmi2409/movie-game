import { useContext, useState, useMemo, useEffect } from "react";
import { UserContext } from "../User/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { formMovie, postMovie, ideaMovie, debounce } from "../Lib/helper";
import StarRating from "react-svg-star-rating";
import {MovieContext} from "./MovieContext";

function GetIdeas({ getIdea,removeIdea }) {
  const changeHandler = (event) => {
    const val = event.target.value;

    if (val.length < 3) return removeIdea();

    getIdea(val);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500),
    []
  );

  return (
    <input
      name="title"
      type="text"
      placeholder="Search for Ideas"
      className="input input-bordered"
      onChange={debouncedChangeHandler}
      required
    />
  );
}

function CreateMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(formMovie);
  const [listIdea, setListIdea] = useState([]);
  const { userData } = useContext(UserContext);
  const {refetchMovies} = useContext(MovieContext);

  const removeIdea = () => {
    setListIdea([]);
  };

  useEffect(() => {
    document.title = "Create New Movie";
  }, []);

  const handleRating = (rating) => {
    rating = rating * 2
    setMovie({ ...movie, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  if (!userData.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postMovie(movie);
    if (res) {
      refetchMovies();
      return navigate("/movies");
    }
  };

  const getIdea = async (idea) => {
    if (5 > idea.length) return;
    const res = await ideaMovie(idea);
    const data = res;
    if (data) {
      setListIdea(data);
    }
  };

  const implementIdea = (idea) => {
    let result = {};
    const post = idea;
    const yearRegex = /\((\d{4})\)/;
    const year = yearRegex.exec(post?.description)[1] || 2000;
    result = {
      title: post.title,
      description: post.plot,
      image_url: post.image,
      genre: post.genres,
      duration: parseInt(post.runtimeStr),
      year: parseInt(year),
      rating: parseInt(post.imDbRating),
      review: post.awards,
    };
    setMovie(result);
    setListIdea([]);
  };

  return (
    <div className="flex items-center content-center flex-col gap-2 p-5 h-full text-base-content">
      <h1 className="text-center text-3xl mb-10 p-2 font-extrabold text-current-focus">
        Create New Movie
      </h1>
      <div className="form-control">
        <GetIdeas getIdea={getIdea} removeIdea={removeIdea}/>
        <ul className="menu bg-base-200">
          {listIdea &&
            listIdea.map((item, i) => (
              <li key={i}>
                <button onClick={() => implementIdea(item)}>
                  {item.title}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <form className="grid grid-cols-2 gap-2 mt-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Title
            </span>
            <input
              name="title"
              type="text"
              placeholder="Movie Title"
              className="input input-bordered"
              value={movie.title}
              onChange={handleChange}
              required
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
              placeholder="Movie Poster"
              className="input input-bordered"
              value={movie.image_url}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Description
            </span>
            <input
              name="description"
              type="text"
              placeholder="Movie Description"
              className="input input-bordered"
              value={movie.description}
              onChange={handleChange}
              required
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
              placeholder="Movie Genre"
              className="input input-bordered"
              value={movie.genre}
              onChange={handleChange}
              required
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
              placeholder="Movie Duration"
              className="input input-bordered"
              value={movie.duration}
              onChange={handleChange}
              required
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
              placeholder="Movie Review"
              className="input input-bordered"
              value={movie.review}
              onChange={handleChange}
              required
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
              placeholder="Movie Year"
              className="input input-bordered"
              value={movie.year}
              onChange={handleChange}
              required
            />
          </label>
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
}

export default CreateMovie;
