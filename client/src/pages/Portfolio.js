import React, { useState } from "react";
import { Container } from "react-bootstrap";

import style from "../style/portfolio.module.css";
import img from "../image/portfolio.webp";
import book from "../image/book.webp";
import book1 from "../image/book1.webp";
import book2 from "../image/book2.webp";
import BookOpen from "../component/portfolio/BookOpen";

const Portfolio = () => {
  const [type, setType] = useState("");
  const openBook = (e) => {
    setType(e.target.id);
    const modal = document.getElementById("openBook");
    modal.classList.add(style.open);
  };

  return (
    <Container
      fluid={true}
      className={style.main}
      style={{ backgroundImage: `url(${img})` }}
    >
      <BookOpen docType={type} />
      <div
        style={{ backgroundImage: `url(${book})` }}
        className={style.books}
        onClick={openBook}
      >
        <p className={style.title} id="education">
          Мої досягнення
        </p>
      </div>
      <div
        style={{ backgroundImage: `url(${book1})` }}
        className={style.books}
        onClick={openBook}
      >
        <p className={style.title} id="studentProject">
          Досягнення учнів
        </p>
      </div>
      <div
        style={{ backgroundImage: `url(${book2})` }}
        className={style.books}
        onClick={openBook}
      >
        <p className={style.title} id="project">
          Спільні проєкти
        </p>
      </div>
    </Container>
  );
};

export default Portfolio;
