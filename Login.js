import React, { useState, useContext } from "react";
import Authorize from "./Authorize";
import Message from "./Message";
import { AuthContext } from "./AuthorizeContext";
import GlobalStyles from "./GlobalStyles";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const handleUsername = (text) => setUser({ ...user, username: text });

  const handlePassword = (pw) => setUser({ ...user, password: pw });

  const onSubmit = (e) => {
    e.preventDefault();
    Authorize.login(user).then((value) => {
      const { isAuthenticated, user, message } = value;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        authContext.setTrigger(!authContext.trigger);
        props.history.push("/loading");
      } else setMessage(message);
    });
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.container}>
        <Text style={GlobalStyles.siHeader}>Please Sign In</Text>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>Username:</Text>
          <TextInput
            name="username"
            value={user.username}
            onChangeText={handleUsername}
            placeholder="username"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            name="password"
            value={user.password}
            onChangeText={handlePassword}
            placeholder="password"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <View style={GlobalStyles.button}>
          <TouchableOpacity style={GlobalStyles.button} onPress={onSubmit}>
            <Text style={GlobalStyles.button}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {message ? <Message message={message} /> : null}
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

export default Login;
