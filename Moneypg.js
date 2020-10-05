import React, { useState, useEffect, useContext } from "react";
import moneyservice from "./moneyservice";
import RegisterAmount from "./Register2";
import SubmitForm from "./SubmitForm";
import Settings from "./Settings";
import { AuthContext } from "./AuthorizeContext";
import GlobalStyles from "./GlobalStyles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Moneypg = (props) => {
  const [moneyStart, setMoneyStart] = useState();
  const [moneyLeft, setMoneyLeft] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  // COMPONENTS AND USE EFFECT
  useEffect(() => {
    moneyservice.getMoney().then((data) => {
      if (!data.data) {
        return console.log("No data!");
      } else if (data.data.length == 0) {
      } else {
        const startData = data.data[0].moneyStart;
        const leftData = data.data[0].moneyLeft;
        setMoneyStart(startData);
        setMoneyLeft(leftData);
      }
    });
  }, [moneyLeft, moneyStart]);

  useEffect(() => {
    return () => {
      console.log("clean up!");
    };
  }, []);

  //TOGGLING MENU FUNCTIONS
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  //HANDLING DB/STATE VALUES FUNCTIONS
  const subtractValue = (val) => {
    const id = authContext.user.data;
    let newAmount = moneyLeft - val;
    moneyservice.editAmount(id, newAmount).then((data) => {
      setMoneyLeft(data.moneyLeft);
    });
  };

  const newTotal = (val) => {
    const id = authContext.user.data;
    moneyservice.editStart(id, val).then((data) => {
      setMoneyLeft(data.moneyLeft);
      setMoneyStart(data.moneyStart);
      toggleMenu();
    });
  };

  const resetAmount = () => {
    const id = authContext.user.data;
    let newAmount = moneyStart;
    moneyservice.editAmount(id, newAmount).then((data) => {
      setMoneyLeft(data.moneyLeft);
      toggleMenu();
    });
  };

  const registerAmount = (val) => {
    setMoneyStart(val.moneyStart);
    setMoneyLeft(val.moneyLeft);
    console.log(authContext.trigger);
    moneyservice
      .postAmount(val)
      .then(authContext.setTrigger(!authContext.trigger));
  };

  //RETURNED JSX FUNCTIONS
  const hasData = () => {
    return (
      <View className="container">
        {showMenu === true ? menu() : appDisplay()}
      </View>
    );
  };

  const noData = () => {
    return <RegisterAmount registerAmount={registerAmount} />;
  };

  const redirect = () => {
    return props.history.push("/login");
  };

  const menu = () => {
    return (
      <Settings
        newTotal={newTotal}
        resetAmount={resetAmount}
        toggleMenu={toggleMenu}
      />
    );
  };

  const appDisplay = () => {
    return (
      <View style={GlobalStyles.container}>
        <View>
          <Text style={styles.header}> Money Left:</Text>
          <Text style={styles.money}>${moneyLeft}</Text>
        </View>
        <SubmitForm subtractValue={subtractValue} />
        <TouchableOpacity onPress={toggleMenu} style={GlobalStyles.button}>
          <Text style={GlobalStyles.button}>SETTINGS</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      {!authContext.user.data
        ? redirect()
        : authContext.user.data.length == 0
        ? noData()
        : hasData()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "#97BC62FF",
    letterSpacing: 1.3,
    fontWeight: "bold",
    textAlign: "center",
  },
  money: {
    fontSize: 62,
    textAlign: "center",
    color: "#97BC62FF",
    letterSpacing: 2.6,
  },
});
export default Moneypg;
