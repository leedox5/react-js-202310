import React from "react";

const Title = ({ username }) => {
  return (
    <div className="container my-2">
      <div className="row border-bottom">
        <div className="col-6"></div>
        <div className="col-6 text-end">
          <span>{username}님 환영합니다!</span>
        </div>
      </div>
    </div>
  );
};

export default Title;
