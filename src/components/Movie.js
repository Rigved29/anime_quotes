import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <div>
        <h2>{props.title}</h2>
        <h3>{props.anime}</h3>
      </div>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
