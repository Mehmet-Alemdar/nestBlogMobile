import React, { useState } from 'react';
import { TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Input = ({ placeholder, value, onChangeText, secureTextEntry, iconName, type }) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        size={32}
        color={isFocused ? colors.secondaryColor: 'gray'}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input(colors.inputTextColor)}
        keyboardType={type ? type : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: height * 0.06,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10, 
  },
  icon: {
    marginHorizontal: 10,
  },
  input: (color) => ({
    flex: 1,
    height: '100%',
    color: color,
  }),
});

export default Input;
