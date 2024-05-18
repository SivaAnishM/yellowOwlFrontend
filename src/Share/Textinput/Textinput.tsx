import React from "react";
import "./Textinput.css";

function Textinput({ type, placeholder, value, onChange, width, height }: any) {
  return (
    <div className="Textinput-Conatiner">
      <input
        type={type}
        className="textInput-searchBar"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default Textinput;
