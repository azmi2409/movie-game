import { GameProvider } from "./GameContext";
import { Routes, Route } from "react-router-dom";
import GameList from "./List";
import CreateGame from "./Create";
import GameDetails from "./Detail";
import EditGame from "./Edit";

const Games = () => {
  return (
    <GameProvider>
      <Routes>
        <Route index element={<GameList />} />
        <Route path="games" element={<GameList />} />
        <Route path="create" element={<CreateGame />} />
        <Route path=":id" element={<GameDetails />} />
        <Route path=":id/edit" element={<EditGame />} />
      </Routes>
    </GameProvider>
  );
};

export default Games;
