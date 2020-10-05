import React from "react";
import { View, StyleSheet, Text } from "react-native";

const getStyle = (props) => {
  let style = "standard";
  if (props.message.msgError) style = "bad";
  else style = "good";
  return style;
};

const goodMsg = (props) => {
  return (
    <View style={styles.default}>
      <View style={styles.good}>
        <Text style={styles.good}>{props.message.msgBody}</Text>
      </View>
    </View>
  );
};

const badMsg = (props) => {
  return (
    <View style={styles.default}>
      <View style={styles.bad}>
        <Text style={styles.bad}>{props.message.msgBody}</Text>
      </View>
    </View>
  );
};

const Message = (props) => {
  return <View>{props.message.msgError ? badMsg(props) : goodMsg(props)}</View>;
};

const styles = StyleSheet.create({
  default: {
    height: 40,
    width: 260,
    marginTop: 10,
    paddingHorizontal: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.65,
    letterSpacing: 2.5,
    fontWeight: "bold",
  },
  good: {
    backgroundColor: "#88C586",
    color: "#25573F",
    borderColor: "#0F3E20",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 5,
    fontWeight: "bold",
    letterSpacing: 2.5,
  },

  bad: {
    backgroundColor: "#DE0B0B",
    color: "#440606",
    borderColor: "#440606",
    borderStyle: "solid",
    letterSpacing: 2.5,
    fontWeight: "bold",
    borderRadius: 10,
    padding: 5,
  },
});

export default Message;
