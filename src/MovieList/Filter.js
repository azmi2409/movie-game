import React from "react";

export const SearchBox = ({ search }) => {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search Movies..."
        className="input input-bordered text-base-content"
        onChange={search}
      />
    </div>
  );
};
