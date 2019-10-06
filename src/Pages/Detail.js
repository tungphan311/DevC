import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Header from '../Components/Header'
import { LIST_IMG } from './Home'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Footer from '../Components/Footer'
import { FOLLOW_COLOR } from '../const'

const Detail = props => {
  const { navigation } = props
  const id = navigation.getParam('id', 0)

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Image
        source={LIST_IMG[id].source}
        resizeMode='cover'
        style={{ flex: 0.6, width: '100%' }}
        borderRadius={40}
      />
      <View style={styles.content}>
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>Eiffel Towel</Text>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <EntypoIcon name='location-pin' size={24} color='grey' />
              <Text style={styles.location}>Paris, France</Text>
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: FOLLOW_COLOR,
              borderRadius: 20,
              borderTopLeftRadius: 0,
              justifyContent: 'center'
            }}
          >
            <FeatherIcon name='download-cloud' size={28} color='white' />
          </View>
        </View>

        <Text style={{ paddingVertical: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
          pellentesque magna
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tag, marginLeft: -10 }}>
            <Text style={{ color: 'grey' }}>#photography</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: 'grey' }}>#sea</Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <EntypoIcon name='heart' size={24} color='grey' />
            <MaterialIcons
              name='mode-comment'
              size={24}
              color='grey'
              style={{ marginLeft: 20 }}
            />
          </View>
          <MaterialIcons name='bookmark' size={24} color='grey' />
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  content: {
    padding: 20,
    width: '100%',
    flex: 0.4,
    marginBottom: 60
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34
  },
  location: {
    lineHeight: 24,
    color: 'grey',
    marginLeft: 10
  },
  tag: {
    padding: 6,
    backgroundColor: '#f7f5f5',
    borderRadius: 8,
    marginHorizontal: 10
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between'
  }
})
