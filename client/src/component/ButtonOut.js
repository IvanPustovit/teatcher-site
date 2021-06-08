import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMessage, logOutUser } from "../redux/sliceReducer";
import { useHistory } from "react-router-dom";

const ButtonOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutUser());
    dispatch(addMessage(""));
    sessionStorage.removeItem("token");
    history.push("/");
  };
  return <Button onClick={logOut}>Вийти</Button>;
};

export default ButtonOut;
