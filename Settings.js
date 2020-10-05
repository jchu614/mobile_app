import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import GlobalStyles from "./GlobalStyles";

const Settings = (props) => {
  const [amount, setAmount] = useState({ value: "" });
  const [message, setMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    props.newTotal(amount.value);
  };

  const onReset = () => {
    props.resetAmount();
  };

  const onClose = () => {
    props.toggleMenu();
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.menu}>
        <TextInput
          type="number"
          value={amount.value}
          onChangeText={(amount) => setAmount({ value: amount })}
          name="value"
          pattern="[0-9]*"
          keyboardType="numeric"
          placeholder="$XX.xx"
          style={GlobalStyles.inputBorder}
        />
        <TouchableOpacity onPress={onSubmit} style={GlobalStyles.button}>
          <Text style={GlobalStyles.button}>NEW TOTAL VALUE</Text>
        </TouchableOpacity>
        <View style={styles.secondMenu}>
          <TouchableOpacity onPress={onReset} style={GlobalStyles.button}>
            <Text style={GlobalStyles.button}>RESET AMOUNT</Text>
          </TouchableOpacity>
          <View style={styles.thirdMenu}>
            <TouchableOpacity onPress={onClose} style={GlobalStyles.button}>
              <Text style={GlobalStyles.button}>CLOSE MENU</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    marginVertical: "auto",
    alignItems: "center",
  },
  secondMenu: {
    marginTop: 44,
  },
  thirdMenu: {
    marginTop: 14,
  },
});

export default Settings;
