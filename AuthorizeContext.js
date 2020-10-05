import React, { createContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import Authorize from "./Authorize";
import GlobalStyles from "./GlobalStyles";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Authorize.isAuthenticated().then((val) => {
      console.log("authContext val ", val);
      setUser(val.user);
      setData(val.data);
      setIsAuthenticated(val.isAuthenticated);
      setIsLoaded(true);
      setTrigger(false);
    });
  }, [isAuthenticated, trigger]);

  return (
    <View>
      {!isLoaded ? (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.siHeader}>In Progress</Text>
        </View>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            trigger,
            setTrigger,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </View>
  );
};
