import React, { useContext } from "react";
import Authorize from "./Authorize";
import { Link, Redirect } from "react-router-native";
import { AuthContext } from "./AuthorizeContext";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    Authorize.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <View style={styles.menuAlign}>
        <View style={styles.spacing}>
          <Link underlayColor="transparent" to="/login">
            <Text style={styles.menuText}>Log In</Text>
          </Link>
        </View>
        <Link underlayColor="transparent" to="/register">
          <Text style={styles.menuText}>Register</Text>
        </Link>
      </View>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link underlayColor="transparent" to="/">
          <Text>
            <Text onPress={onClickLogoutHandler} style={styles.menuText}>
              Log Out
            </Text>
          </Text>
        </Link>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Link underlayColor="transparent" style={styles.text} to="/">
        <Text style={styles.text}>Money Manager</Text>
      </Link>
      <View>
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: "auto",
    paddingVertical: 0,
    paddingHorizontal: 20,
    backgroundColor: "#9DB2A4",
    color: "#214534",
  },
  text: {
    padding: 0,
    margin: 0,
    letterSpacing: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#214534",
  },
  menuText: {
    letterSpacing: 0.8,
    color: "#214534",
  },
  menuAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  spacing: {
    marginRight: 19,
  },
});
export default Navbar;
