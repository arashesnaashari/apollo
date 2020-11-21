import React from "react";

const BookDetails = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <img src={props.detail.image} />
      <span>{props.detail.title} | </span>
      <span>{props.detail.price}</span>
      <span>{props.detail.group} | </span>
      <span>{props.detail.author} | </span>
      <span>{props.detail.publication} | </span>
    </div>
  );
};
export default BookDetails;
