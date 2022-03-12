import React from "react";
import { useRef } from "react";
import styles from "./Formstyle.module.css";

const Form = (props) => {
  const referOne = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    props.formFetch(referOne.current.value);

    referOne.current.value = "";
  };

  return (
    <form className={styles.c}>
      <div>
        <div className={styles.b}>
          <h2>Enter Your favourite Anime character</h2>
        </div>
        <input type="text" placeholder="Anime Character" ref={referOne}></input>
      </div>
      <button type="submit" onClick={submitHandler}>
        Fetch Quotes
      </button>
    </form>
  );
};

export default Form;
