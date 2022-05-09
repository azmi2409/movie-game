import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MovieList from "./MovieList";
import Container from "./Components/Container";
import Register from "./User/Register";
import { useContext} from "react";
import { UserContext } from "./User/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./User/Login";
import Sidebar from "./Components/Sidebar";
import Drawer from "./Components/Drawer";
import Movies from "./MovieList";
import Games from "./GameList";
import Dashboard from "./User/Dashboard";

function App() {
  const { darkMode,userData } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Container dataTheme={darkMode ? "luxury" : "emerald"}>
      <Drawer>
      <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="movies/*" element={<Movies />} />
          <Route path="games/*" element={<Games />} />
          <Route path="signup" element={<Register />} />
          <Route path="signin" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
        {!userData.isLoggedIn && <Footer />}
        </Drawer>
        {userData.isLoggedIn && <Sidebar />}
      </Container>
    </BrowserRouter>
  );
}

export default App;
