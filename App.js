import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Moneypg from "./Moneypg";
import Settings from "./Settings";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import RegisterAmount from "./Register2";
import Loading from "./Loading";
import Message from "./Message";
import { NativeRouter, Switch, Route } from "react-router-native";
import AuthProvider from "./AuthorizeContext";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <AuthProvider>
      <NativeRouter>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <ImageBackground
            source={require("./assets/bgimg.jpg")}
            style={styles.container}
          >
            <Navbar />
            <Route path="/hidden" component={Message} />
            <Route path="/loading" component={Loading} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/register2" component={RegisterAmount} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/" component={Moneypg} />
          </ImageBackground>
        </SafeAreaView>
      </NativeRouter>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
export default App;
