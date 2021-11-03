import React from "react";
import "./error.scss";
const Error404 = () => {
  return (
    <div className="main">
      <h1>
        NOT FOUND <span>:(</span>
      </h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
      <i className="icon">404</i>
    </div>
  );
};

export default Error404;
