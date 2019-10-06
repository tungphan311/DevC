import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  POLO_COLOR,
  FOLLOW_COLOR,
  SEND_MESSAGE_COLOR,
  SCREEN_WIDTH
} from '../const'
import Info from '../Components/Info'

class Home extends Component {
  render () {
    const centerImgData = Math.floor(LIST_IMG.length / 2)
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <SafeAreaProvider>
          <Header />
          <View style={styles.userWrapper}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../assets/avatar.jpg')}
                style={styles.image}
                resizeMode='cover'
                borderRadius={60}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.username}>Tung Phan</Text>
              <Text style={styles.position}>Developer</Text>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.follow}
                  onPress={() => alert('Followed')}
                >
                  <Text style={{ color: 'white' }}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.send}
                  onPress={() => alert('message sended')}
                >
                  <Icon name='md-send' size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingBottom: 40,
              justifyContent: 'space-evenly',
              flexDirection: 'row'
            }}
          >
            <Info amount='210' title='Photos' />
            <Info amount='15k' title='Followers' />
            <Info amount='605' title='Followings' />
          </View>
          <View style={{ flex: 1, marginBottom: 60 }}>
            <ScrollView contentContainerStyle={styles.grid}>
              <View style={{ flexDirection: 'column' }}>
                {LIST_IMG.slice(0, centerImgData).map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('Detail', { id: item.id })
                    }
                  >
                    <Image
                      source={item.source}
                      style={styles.post}
                      resizeMode='cover'
                      borderRadius={20}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: 'column' }}>
                {LIST_IMG.slice(centerImgData).map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('Detail', { id: item.id })
                    }
                  >
                    <Image
                      source={item.source}
                      style={styles.post}
                      resizeMode='cover'
                      borderRadius={20}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <Footer />
        </SafeAreaProvider>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  userWrapper: {
    height: 160,
    marginTop: 80,
    flexDirection: 'row'
  },
  avatarWrapper: {
    width: 160,
    padding: 20
  },
  infoWrapper: {
    width: '100%',
    paddingVertical: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: POLO_COLOR
  },
  position: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 40
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  follow: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: FOLLOW_COLOR,
    borderRadius: 16
  },
  send: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: SEND_MESSAGE_COLOR,
    borderRadius: 15,
    marginLeft: 10
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  post: {
    width: (SCREEN_WIDTH - 60) / 2,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 10
  }
})

export const LIST_IMG = [
  { id: 0, source: require('../../assets/img1.jpeg') },
  { id: 1, source: require('../../assets/img2.jpg') },
  { id: 2, source: require('../../assets/img3.jpg') },
  { id: 3, source: require('../../assets/img4.jpg') },
  { id: 4, source: require('../../assets/img5.jpg') },
  { id: 5, source: require('../../assets/img6.jpg') },
  { id: 6, source: require('../../assets/img7.jpeg') },
  { id: 7, source: require('../../assets/img2.jpg') }
]
