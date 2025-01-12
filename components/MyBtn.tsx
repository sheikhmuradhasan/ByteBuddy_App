import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const MyBtn = ({ btnTitle, onPress }) => {
  return (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{btnTitle}</Text>
      </TouchableOpacity>
  )
}

export default MyBtn;

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#7C84D7", 
        paddingVertical: 15, 
        borderRadius: 10,
        alignItems: "center"
    },
    text:{
        fontSize:15, 
        color:"white", 
        fontWeight:"600"
    }

});