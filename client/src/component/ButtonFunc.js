import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addPosts,
  deleteFileFetch,
  deletePosts,
  getPosts,
} from "../redux/middleware/axios";

const ButtonFunc = ({ variant, style, text, file, typeBtn }) => {
  // console.log(file);
  const dispatch = useDispatch();
  const startClick = (e) => {
    switch (typeBtn) {
      case "delete":
        return dispatch(deleteFileFetch(file));
      case "post":
        dispatch(addPosts(file));
        dispatch(getPosts());

        return;
      case "deletePost":
        dispatch(deletePosts(file._id));
        return;

      default:
        return;
    }
  };
  return (
    <Button variant={variant} className={style} onClick={startClick}>
      {text}
    </Button>
  );
};

export default ButtonFunc;
