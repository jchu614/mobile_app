import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthorizeContext";
import moneyservice from "./moneyservice";
import Message from "./Message";
import Loading from "./Loading";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "./GlobalStyles";

const RegisterAmount = (props) => {
  const [amount, setAmount] = useState({ moneyStart: 0, moneyLeft: 0 });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const resetForm = () => {
    setAmount({ moneyStart: 0, moneyLeft: 0 });
  };

  const redirect = () => {
    return <Loading />;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.registerAmount(amount);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.container}>
        <Text style={GlobalStyles.siHeader}>Input Money Data:</Text>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>Starting Amount: </Text>
          <TextInput
            type="number"
            name="moneyStart"
            value={amount.moneyStart}
            onChangeText={(val) => setAmount({ ...amount, moneyStart: val })}
            pattern="[0-9]*"
            keyboardType="numeric"
            placeholder="$XX.xx"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <View style={styles.spacing}>
          <Text style={GlobalStyles.siHeader2}>How Much is Left: </Text>
          <TextInput
            type="number"
            name="moneyLeft"
            value={amount.moneyLeft}
            onChangeText={(val) => setAmount({ ...amount, moneyLeft: val })}
            placeholder="$XX.xx"
            keyboardType="numeric"
            style={GlobalStyles.inputBorder}
          ></TextInput>
        </View>
        <TouchableOpacity style={GlobalStyles.button} onPress={onSubmit}>
          <Text style={GlobalStyles.button}>Submit Amount</Text>
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

export default RegisterAmount;
