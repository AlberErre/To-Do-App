import React from "react";
import "../App.css";

const TitleInput = () => {
  return (
	<input
		type="text"
		name="noteTitle"
		className="inputField"
		placeholder="Note name..."
	/>
  );
};

export default TitleInput;
