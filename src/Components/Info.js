import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Info = ({ amount, title }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({
  amount: {
    fontSize: 20,
    fontWeight: '600',
    padding: 8
  },
  title: {
    color: 'grey',
    fontWeight: '600'
  }
})
