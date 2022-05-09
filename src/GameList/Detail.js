import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getGames } from "../Lib/helper";
import { GameContext } from "./GameContext";

const GameDetails = () => {
  const id = useParams().id;
  const { filteredGames, eraseGame } = useContext(GameContext);
  const thisGame = filteredGames.find((v) => v.id === id);
  const [game, setGame] = useState(thisGame || []);
  useEffect(() => {
    if (!thisGame) {
      getGames(id).then((res) => {
        setGame(res);
        document.title = `Details : ${game.name}`;
      });
    }
  }, [id]);

  return (
    <div className="grid grid-cols-2 mt-10 gap-5 overflow-y-hidden">
      <div className="flex flex-col content-center items-end justify-items-center text-center">
        <div className="flex content-center items-center flex-col w-2/3">
          <h1 className="text-2xl text-current font-bold w-1/2">{game.name}</h1>
          <figure className="mt-1">
            <img
              className="h-80 my-5 object-contain"
              src={game.image_url}
              alt="pict"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="flex flex-row gap-2 content-center items-center justify-center w-2/3 btn-group">
          <button className="btn btn-primary">
            <Link to={`edit`}>Edit</Link>
          </button>
          <button onClick={() => eraseGame(game.id)} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col content-center items-start justify-items-center text-center">
        <h2 className="text-lg text-current font-bold w-1/2 mb-10">
          Game Details
        </h2>
        <article className="mt-2 text-justify flex gap-2 flex-col">
          <p className="text-lg">Release Year : {game.release}</p>
          <p className="text-lg">Genre : {game.genre}</p>
          <p className="text-lg">Platform : {game.platform}</p>
          <p className="text-lg">
            SinglePlayer: {game.singlePlayer ? "Yes" : "No"}
          </p>
          <p className="text-lg">
            MultiPlayer: {game.multiplayer ? "Yes" : "No"}
          </p>
        </article>
      </div>
    </div>
  );
};

export default GameDetails;
