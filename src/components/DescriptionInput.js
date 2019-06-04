import React from "react";
import "../App.css";

const DescriptionInput = () => {
  return (
	<textarea 
		name="noteText"
		cols="50" 
		rows="8"
		maxLength="400">
	</textarea>
  );
};

export default DescriptionInput;
