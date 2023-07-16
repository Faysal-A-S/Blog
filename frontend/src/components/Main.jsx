import React from "react";

const Main = ({ data }) => {
  return (
    <div className=" pt-5 mt-5 ">
      <div className="addBlog  mx-auto my-auto row  align-items-center p-5 mt-5">
        <h3 className="text-center align-top fw-bolder">{data[0].title}</h3>
        <img
          src={data[0].image}
          alt="Not available"
          className="img-fluid h-100 mx-auto mb-5"
        />
        <p>{data[0].description}</p>
      </div>
    </div>
  );
};

export default Main;
