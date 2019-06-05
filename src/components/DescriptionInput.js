import React from "react";
import "../App.css";

const DescriptionInput = (props) => {
  return (
    <textarea
      name="noteText"
      placeholder={(props.currentValue) ? props.currentValue : 'Description...'}
      className="descriptionInput"
      rows={(props.customRows) ? props.customRows : '5'}>
    </textarea>
  );
};

export default DescriptionInput;
