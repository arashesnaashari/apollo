import React from "react";

const AutoCompleteItem = ({ name, capital, region, flag, title, author }) => {
  return (
    <li>
      <div className="row">
        <div className="col text-left">
          <p className="mb-0 badge badge-primary">{author}</p>
          <p className="mb-0 ml-2 badge badge-secondary">{title}</p>
        </div>
      </div>
    </li>
  );
};

export default AutoCompleteItem;
