import React from "react";

const Title = ({ username }) => {
  return (
    <div className="container my-2">
      <div className="row border-bottom">
        <div className="text-end">
          <span>[{username}]님 환영합니다!</span>
        </div>
      </div>
    </div>
  );
};

export default Title;
