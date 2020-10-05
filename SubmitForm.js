import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import GlobalStyles from "./GlobalStyles";

const SubmitForm = (props) => {
  const [amount, setAmount] = useState({ value: null });
  const [message, setMessage] = useState(null);

  const onChange = (val) => {
    setAmount({ value: val });
  };

  const resetForm = () => {
    setAmount({ value: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.subtractValue(amount.value);
    resetForm();
  };

  return (
    <View className="input-box" id="Submit-form">
      <View>
        <TextInput
          type="number"
          value={amount.value}
          onChangeText={onChange}
          name="value"
          pattern="[0-9]*"
          keyboardType="numeric"
          placeholder="$XX.xx"
          style={GlobalStyles.inputBorder}
        />
        <View style={styles.spacing}>
          <TouchableOpacity
            style={GlobalStyles.button}
            type="submit"
            onPress={onSubmit}
          >
            <Text style={GlobalStyles.button}>AMOUNT SPENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginTop: 8,
  },
});

export default SubmitForm;
