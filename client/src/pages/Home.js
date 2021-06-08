import React, { useEffect } from "react";
import { Container, Image, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spiner from "../component/spiner/Spiner";

import img from "../image/main.webp";
import foto from "../image/sveta9.jpg";

import { getPosts } from "../redux/middleware/axios";

import style from "../style/home.module.css";

const Home = () => {
  const posts = useSelector((state) => state.platform.posts);
  const loader = useSelector((state) => state.platform.loader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <>
      <Container
        fluid={true}
        className={style.main}
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* <div style={{ marginTop: "50px" }}>
          <Link to="/admin">Admin</Link>
        </div> */}
        <Container className={style.container}>
          <div className={style.photoContainer}>
            <Image src={foto} className={style.photo} />
          </div>
          <div className={style.info}>
            <div className={style.motto}>
              <h2 className={style.title}>Життєве кредо:</h2>
              <p>Треба самому багато знати, щоб навчити інших. (В.Короленко)</p>
            </div>{" "}
            <div>
              <h3>Посада:</h3>
              <p className={style["title-info"]}>
                Вчитель технологій (обслуговуюча праця)
              </p>
            </div>
            <div>
              <h3>Освіта:</h3>
              <p className={style["title-info"]}>
                Повна вища, ЧНПУ ім. Т.Шевченка м.Чернігів
              </p>
            </div>
            <div>
              <h3>Місце роботи:</h3>
              <p className={style["title-info"]}>
                Трисвятськослобідська ЗЗСО І-ІІІ ступенів
              </p>
            </div>
            <div>
              <h3>Педагогічний стаж роботи:</h3>
              <p className={style["title-info"]}>4 роки (2020р)</p>
            </div>
          </div>
        </Container>

        <div className={style.poster}>
          <h2>АФІШКА</h2>

          <ListGroup>
            {loader && <Spiner />}
            {posts.map((post) => (
              <ListGroup.Item key={post._id}>{post.post}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    </>
  );
};

export default Home;
