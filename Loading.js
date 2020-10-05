import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalStyles from "./GlobalStyles";

const Loading = (props) => {
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const loadingFunc = () => {
    timerID = setTimeout(() => {
      props.history.push("/");
    }, 2000);
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.siHeader}>Loading...</Text>
      {loadingFunc()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    margin: 0,
  },
});

export default Loading;
