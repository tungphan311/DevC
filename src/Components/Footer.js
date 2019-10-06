import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

class Footer extends Component {
  render () {
    return (
      <View style={styles.footer}>
        <Icon name='ios-home' size={24} color='grey' />
        <FeatherIcon name='plus-circle' size={24} color='grey' />
        <Icon name='ios-person' size={24} color='grey' />
      </View>
    )
  }
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    bottom: 0
  }
})
