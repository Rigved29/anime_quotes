import React from "react";
import { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Form from "./components/Form";
import styles from "./components/appstyle.module.css";

let initial = true;

function App() {
  const [isLoader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("https://animechan.vercel.app/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const d = data.map((q, i) => {
          return {
            title: q.character,
            anime: q.anime,
            openingText: q.quote,
            id: i + 1,
          };
        });

        setQuotes(d);
      });
  }, []);

  const fetchDataHandler = async (ch) => {
    try {
      initial = false;
      setLoader(true);
      setError(false);
      const responseOne = await fetch(
        `https://animechan.vercel.app/api/quotes/character?name=${ch}`
      );

      if (!responseOne.ok) {
        setError(true);
        throw new Error("No Quotes Found!! ");
      }
      const data = await responseOne.json();

      const d = data.map((q, i) => {
        return {
          title: q.character,
          anime: q.anime,
          openingText: q.quote,
          id: i + 1,
        };
      });

      setQuotes(d);
      setLoader(false);

      const responseTwo = await fetch(
        `https://api.jikan.moe/v3/search/character?q=${ch}&order_by=title&sort=asc&limit=10`
      );
      if (!responseTwo.ok) {
        throw new Error("Sorry");
      }

      const imgData = await responseTwo.json();
      setImgSrc(imgData.results[0].image_url);
    } catch (err) {
      console.log(err);
      setImgSrc("");
    }
  };

  return (
    <React.Fragment>
      <Form formFetch={fetchDataHandler} />
      {!isLoader && !initial && imgSrc && (
        <img src={imgSrc} alt="Sorry,No character_img available😔😔" />
      )}
      {!isLoader && !initial && !imgSrc && (
        <h4 className={styles.n}>Sorry,No character image available😔😔</h4>
      )}
      <section>
        {!isLoader && !error && <MoviesList movies={quotes} />}
        {isLoader && !error && <h3>Loading...</h3>}
        {error && <h3 className={styles.cn}>No Quotes Found!!😬😬</h3>}
      </section>
    </React.Fragment>
  );
}

export default App;
