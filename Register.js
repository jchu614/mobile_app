import React, { useState, useRef, useEffect } from "react";
import Authorize from "./Authorize";
import Message from "./Message";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "./GlobalStyles";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Authorize.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 1000);
      }
    });
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.container}>
        <Text style={GlobalStyles.siHeader}>Please Register</Text>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>Username: </Text>
          <TextInput
            type="text"
            name="username"
            value={user.username}
            onChangeText={(text) => setUser({ ...user, username: text })}
            placeholder="username"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>Password: </Text>
          <TextInput
            secureTextEntry={true}
            name="password"
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            placeholder="password"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <TouchableOpacity style={GlobalStyles.button} onPress={onSubmit}>
          <Text style={GlobalStyles.button}>Register</Text>
        </TouchableOpacity>
        {message ? <Message message={message} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    alignItems: "center",
  },
  spacing: {
    marginVertical: 5,
    padding: 5,
  },
});

export default Register;
