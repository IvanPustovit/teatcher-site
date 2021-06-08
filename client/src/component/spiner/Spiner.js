import React from "react";
import "./style.css";

const Spiner = () => {
  return (
    <div className="view">
      <div className="cssload-loading">
        <div className="cssload-finger cssload-finger-1">
          <div className="cssload-finger-item">
            <span></span>
            <i></i>
          </div>
        </div>
        <div className="cssload-finger cssload-finger-2">
          <div className="cssload-finger-item">
            <span></span>
            <i></i>
          </div>
        </div>
        <div className="cssload-finger cssload-finger-3">
          <div className="cssload-finger-item">
            <span></span>
            <i></i>
          </div>
        </div>
        <div className="cssload-finger cssload-finger-4">
          <div className="cssload-finger-item">
            <span></span>
            <i></i>
          </div>
        </div>
        <div className="cssload-last-finger">
          <div className="cssload-last-finger-item">
            <i></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spiner;
