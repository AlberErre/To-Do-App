import React from "react";
import "../App.css";

const ColorPicker = () => {
  return (
	<select name="noteColor">
		<option value="nocolor">No color</option>
		<option value="blue">Blue</option>
		<option value="green">Green</option>
		<option value="red">Red</option>
		<option value="yellow">Yellow</option>
	</select>
  );
};

export default ColorPicker;
