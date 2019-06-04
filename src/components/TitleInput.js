import React from "react";
import "../App.css";

const TitleInput = (props) => {
  return (
	<input
    type="text"
		name="noteTitle"
    className="inputField"
    placeholder={(props.currentValue) ? props.currentValue : "Name..."}
	/>
  );
};

export default TitleInput;
