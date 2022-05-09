import { useState,useMemo,useEffect } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteGame,debounce} from "../Lib/helper";
import { Modal } from "react-daisyui";
import { useContext } from "react";
import { UserContext } from "../User/UserContext";
import { GameContext } from "./GameContext";
import { SearchBox } from "./Filter";
import { Dropdown } from "react-daisyui";

const GameList = () => {
  const { userData } = useContext(UserContext);
  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);
  const {filteredGames , filterGame , refetchGames , sortGames} = useContext(GameContext);
  const navigate = useNavigate();
  const { isLoggedIn } = userData;


  useEffect(() => {
    document.title = "Game List";
  }, []);

  const handleCLick = (id) => {
    navigate(`/games/${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/games/${id}/edit`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setId(id);
    setModal(true);
  };

  const confirmDelete = async () => {
    console.log(id);
    await deleteGame(id);
    setModal(false);
    refetchGames();
  };

  const search = debounce(filterGame, 200);

  const debounceSearch = useMemo(() => search, [search]);

  return (
    <>
      <div className="flex flex-row items-start content-between place-content-between w-full mt-10 px-5">
      <SearchBox search={debounceSearch}/>
      <Dropdown>
        <Dropdown.Toggle>Sort By</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-content menu p-2 rounded-box w-35 text-base-content">
          <Dropdown.Item className="menu-item">
            <button onClick={() => sortGames('title')} name="title">Name</button>
          </Dropdown.Item>
          <Dropdown.Item className="menu-item">
            <button onClick={() => sortGames('year')} name="year">Release Year</button>
          </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5 px-5 w-full my-5">
      <Modal open={modal} onMouseEnter={e => e.stopPropagation()} onCancel={() => setModal(false)} footer={false}>
        <div className="flex flex-col items-center justify-center p-5 rounded-3xl backdrop-blur backdrop-filter glass text-black w-64">
          <h1 className="text-2xl">Are you sure to Delete this game?</h1>
          <div className="btn-group">
            <button
              onClick={confirmDelete}
              className="btn btn-error rounded-full mt-5"
            >
              Yes
            </button>
            <button
              onClick={() => setModal(false)}
              className="btn btn-secondary rounded-full mt-5"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      {filteredGames &&
        filteredGames.map((game) => (
          <div
            key={game.id}
            className="card card-compact bg-trasparent backdrop-blur backdrop-filter glass shadow-xl cursor-pointer transition-transform group rounded-xl items-center"
            onClick={() => handleCLick(game.id)}
          >
            <figure className="relative card-body min-w-10">
              <img
                className="object-cover rounded-lg"
                src={game.image_url}
                alt="pict"
              />
              {isLoggedIn && (
                <>
                  <div className="absolute z-20 top-0 right-0 p-2 hidden group-hover:block">
                    <button
                      onClick={(e) => handleEdit(e, game.id)}
                      className="btn btn-primary rounded-full"
                    >
                      <BiEdit />
                    </button>
                  </div>
                  <div className="absolute z-20 top-0 left-0 p-2 hidden group-hover:block">
                    <button
                      onClick={(e) => handleDelete(e, game.id)}
                      className="btn btn-error rounded-full"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <div className="absolute bg-secondary bg-opacity-50 z-20 top-0 left-0 p-2 hidden group-hover:block">
                  <p className="text-lg text-current">Login to edit / delete</p>
                </div>
              )}
              <div className="bg-secondary bg-opacity-30 group-hover:bg-opacity-80 absolute bottom-0 mb-3 w-full items-center flex content-center flex-col">
                <label className="card-title text-current text-lg text-center">
                  {game.name}
                </label>
                <div className="flex flex-row justify-center">
                    <h2 className="text-lg text-current uppercase">{game.release}</h2>
                </div>
              </div>
              <div className="absolute h-full w-full bg-gray-200 bg-opacity-0 group-hover:bg-opacity-10"></div>
            </figure>
          </div>
        ))}
    </div>
    </>
  );
};

export default GameList;
