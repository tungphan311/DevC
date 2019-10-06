import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class Header extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <Icon
            name='md-arrow-back'
            size={24}
            color='grey'
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <EntypoIcon
          name='grid'
          size={24}
          color='grey'
          style={styles.gridIcon}
        />
      </View>
    )
  }
}

export default Header

const styles = StyleSheet.create({
  header: {
    height: 40,
    position: 'absolute',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 100
  },
  backIcon: {
    marginLeft: 20
  },
  gridIcon: {
    marginRight: 20
  }
})
