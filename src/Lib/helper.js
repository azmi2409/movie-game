import axios from "axios";

const SERVER = "https://super-bootcamp-backend.sanbersy.com";

export const register = async (data) => {
  try {
    const res = await axios.post(`${SERVER}/api/register`, data);
    return res.data;
  } catch (err) {
    return false;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await axios.post(`${SERVER}/api/change-password`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(res.data)
    return res.data;
  } catch (err) {
    return false;
  }
};
export const handleLogin = async (data) => {
  try {
    const res = await axios.post(`${SERVER}/api/login`, data);
    const post = await res.data;
    return post;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const originalData = {
  name: "",
  email: "",
  password: "",
  verifyPassword: "",
};

const getToken = () => {
  const data = localStorage.getItem("user");
  const token = JSON.parse(data).token;
  return token;
};

export const getMovies = async (id) => {
  const endpoint = `${SERVER}/api/movies`;
  let res;
  try {
    if (!id) {
      res = await axios.get(endpoint);
    } else res = await axios.get(`${endpoint}/${id}`);
    const post = await res.data;
    return post;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getGames = async (id) => {
  const endpoint = `${SERVER}/api/games`;
  let res;
  try {
    if (!id) {
      res = await axios.get(endpoint);
    } else res = await axios.get(`${endpoint}/${id}`);
    const post = await res.data;
    return post;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const postMovie = async (data) => {
  try {
    const res = await axios.post(`${SERVER}/api/movies`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const postGame = async (data) => {
  try {
    const res = await axios.post(`${SERVER}/api/games`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const editMovie = async (data) => {
  try {
    const res = await axios.put(`${SERVER}/api/movies/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const editGame = async (data) => {
  try {
    const res = await axios.put(`${SERVER}/api/games/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteMovie = async (id) => {
  try {
    const res = await axios.delete(`${SERVER}/api/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteGame = async (id) => {
  try {
    const res = await axios.delete(`${SERVER}/api/games/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    return false;
  }
};

export const ideaMovie = async (data) => {
  const apiKey = "k_6h5917hw";
  const server = "https://imdb-api.com/en/API";
  //const options = "title,plot,image,genres,runtimeMins,year,imDbRating,awards";
  try {
    const res = await axios.get(
      `${server}/AdvancedSearch/${apiKey}/?title=${data}`
    );
    //const res2 = await axios.get(`${server}/Title/${apiKey}/${res.data.results[0].id}/${options}`);
    const post = res.data.results;
    return post.slice(0, 5);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const formMovie = {
  title: "",
  description: "",
  duration: 0,
  genre: "",
  image_url: "",
  rating: 0,
  review: "",
  year: 2000,
};

export const formGame = {
  genre: "",
  image_url: "",
  singlePlayer: false,
  multiplayer: false,
  name: "",
  platform: "",
  release: 2000,
};

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
