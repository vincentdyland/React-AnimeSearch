import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getTopAnime = async () => {
    const resp = await fetch(
      "https://api.jikan.moe/v3/top/anime/1/bypopularity"
    ).then((res) => res.json());
    setTopAnime(resp.top.slice(0, 9));
  };

  const getListAnime = async () => {
    const resp = await fetch(
      "https://api.jikan.moe/v3/top/anime/1/bypopularity"
    ).then((res) => res.json());
    setAnimeList(resp.top);
  };

  useEffect(() => {
    getTopAnime();
    getListAnime();
  }, []);

  const HandleSearch = (e) => {
    e.preventDefault();
    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    setAnimeList(temp.results);
  };

  return (
    <div className="App">
      <div className="main">
        <Header />
        <div className="content-wrap">
          <Sidebar topAnime={topAnime} />
          <MainContent
            HandleSearch={HandleSearch}
            search={search}
            setSearch={setSearch}
            animeList={animeList}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
