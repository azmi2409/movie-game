import { useState, createContext, useEffect } from "react";
import { getGames } from "../Lib/helper";
import { deleteGame } from "../Lib/helper";
import { useNavigate } from "react-router-dom";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState(games);

  const eraseGame = async (id) => {
    const res = await deleteGame(id);
    refetchGames();
    return navigate("/");
  };

  const filterGame = (e) => {
    const { value } = e.target;
    const newGames = games.filter((game) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGames(newGames);
  };

  const refetchGames = async () => {
    const games = await getGames();
    setGames(games);
    setFilteredGames(games);
  };

  const sortGames = (value) => {
    const newGames = [...games];
    newGames.sort((a, b) => {
      if (value === "title") {
        return a.name.localeCompare(b.name);
      } else if (value === "year") {
        return a.release - b.release;
      }
    });
    setFilteredGames(newGames);
  };

  useEffect(() => {
    getGames().then((data) => {
      if (data) {
        setGames(data);
        setFilteredGames(data);
      }
    });
  }, []);

  return (
    <GameContext.Provider
      value={{ refetchGames, filterGame, filteredGames, eraseGame , sortGames }}
    >
      {children}
    </GameContext.Provider>
  );
};
