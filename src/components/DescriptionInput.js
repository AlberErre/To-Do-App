import React from "react";
import "../App.css";

const DescriptionInput = (props) => {
  return (
	<textarea
    name="noteText"
    placeholder={(props.currentValue) ? props.currentValue : 'Description...'}
		cols="50"
		rows="8"
		maxLength="400">
	</textarea>
  );
};

export default DescriptionInput;
