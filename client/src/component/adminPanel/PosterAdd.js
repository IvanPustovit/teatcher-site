import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/middleware/axios";
import ButtonFunc from "../ButtonFunc";
import PosterForm from "../forms/PosterForm";
import Spiner from "../spiner/Spiner";
import style from "../../style/adminPanel/post.module.css";

const PosterAdd = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.platform.loader);
  const posts = useSelector((state) => state.platform.posts);
  const [text, setText] = useState({ value: "" });

  const onChange = (e) => {
    setText({ post: e.target.value });
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      {loader && <Spiner />}
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item className={style.list}>
            <p className={style.text}> {post.post}</p>
            <div className={style.btn}>
              <ButtonFunc
                variant="dark"
                file={post}
                text="Видалити"
                typeBtn="deletePost"
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onChange={onChange}>
        <PosterForm label="Ваше оголошення" />
        <ButtonFunc text="Опублікувати" typeBtn="post" file={text} />
      </Form>
    </div>
  );
};

export default PosterAdd;
