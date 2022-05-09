import { useContext, useState, useEffect } from "react";
import { UserContext } from "../User/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { formGame, postGame } from "../Lib/helper";
import {GameContext} from './GameContext'

function CreateGame() {
  const navigate = useNavigate();
  const {refetchGames} = useContext(GameContext)
  const [game, setGame] = useState(formGame);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    document.title = "Create New Game";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  if (!userData.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postGame(game);
    if (res) {
      refetchGames();
      return navigate("/games");
    }
  };

  return (
    <div className="flex items-center content-center flex-col gap-2 p-5 h-full text-base-content">
      <h1 className="text-center text-3xl mb-10 p-2 font-extrabold text-current-focus">
        Create New Game
      </h1>
      <form className="grid grid-cols-1 gap-2 mt-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Name
            </span>
            <input
              name="name"
              type="text"
              placeholder="Game Name"
              className="input input-bordered"
              value={game.name}
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
              placeholder="Game Poster"
              className="input input-bordered"
              value={game.image_url}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Platform
            </span>
            <input
              name="platform"
              type="text"
              placeholder="Game Platform"
              className="input input-bordered"
              value={game.platform}
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
              placeholder="Game Genre"
              className="input input-bordered"
              value={game.genre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Release
            </span>
            <input
              name="release"
              type="number"
              placeholder="Game Release"
              className="input input-bordered"
              value={game.release}
              onChange={handleChange}
              min="2000"
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Single Player
            </span>
            <input
              name="singlePlayer"
              type="checkbox"
              className="checkbox"
              onClick={handleChange}
              checked={game.singlePlayer}
              value={1}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="text-base-content" style={{ width: 100 }}>
              Multi Player
            </span>
            <input
              name="multiplayer"
              type="checkbox"
              className="checkbox"
              onClick={handleChange}
              checked={game.multiplayer}
              value={1}
            />
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

export default CreateGame;
