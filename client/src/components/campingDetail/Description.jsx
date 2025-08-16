import React from "react";

const Description = ({ text }) => {
  return (
    <article className="mt-4">
      <p className="text-gray-700 text-lg leading-loose">{text}</p> 
    </article>
  );
};

export default Description;
