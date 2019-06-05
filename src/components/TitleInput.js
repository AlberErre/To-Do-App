import React from "react";
import { TextInput } from '@aragon/ui';
import "../App.css";

const TitleInput = (props) => {
  return (
    <TextInput
      wide
      type="text"
      name="noteTitle"
      placeholder={(props.currentValue) ? props.currentValue : "Title..."}
    />
  );
};

export default TitleInput;
