import React from "react";
import { Header } from "react-native-elements";

export default MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
      }}
      backgroundColor="#EaF8fE"
    />
  );
};
