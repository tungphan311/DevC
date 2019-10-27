import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Linking
} from 'react-native'
import moment from 'moment'
import { Card, Button, Icon } from 'react-native-elements'

export default function App () {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [hasErrored, setHasApiError] = useState(false)
  const [lastPageReached, setLastPageReached] = useState(false)

  useEffect(
    () => {
      getNews()
    },
    [articles]
  )

  const getNews = async () => {
    if (lastPageReached) return

    setLoading(true)
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=6fdbe3a0fd2c4f3ca026721484413a51&page=${pageNumber}`
      )

      const jsonData = await response.json()
      const hasMoreArticles = jsonData.articles.length > 0
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        )
        setArticles(newArticleList)
        setPageNumber(pageNumber + 1)
      } else {
        setLastPageReached(true)
      }
    } catch (error) {
      setHasApiError(true)
    }
    setLoading(false)
  }

  const filterForUniqueArticles = arr => {
    const cleaned = []
    arr.forEach(itm => {
      let unique = true
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2)
        if (isEqual) unique = false
      })
      if (unique) cleaned.push(itm)
    })
    return cleaned
  }

  const renderArticleItem = ({ item }) => (
    <Card title={item.title} image={{ uri: item.urlToImage }}>
      <View style={styles.row}>
        <Text style={styles.label}>Source</Text>
        <Text style={styles.info}>{item.source.name}</Text>
      </View>
      <Text style={styles.info}>{item.content}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Published</Text>
        <Text style={styles.info}>
          {moment(item.publishedAt).format('LLL')}
        </Text>
      </View>
      <Button
        icon={<Icon />}
        title='Read more'
        backgroundColor='#03A9F4'
        onPress={() => onPress(item.url)}
      />
    </Card>
  )

  const onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log(`Don't know how to open URL: ${url}`)
      }
    })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ActivityIndicator size='large' loading={loading} />
      </View>
    )
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =(</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.row}>
        <Text style={{ ...styles.label, color: '#fff' }}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={item => item.title}
        onEndReached={getNews}
        onEndReachedThreshold={1}
        ListFooterComponent={
          lastPageReached ? (
            <View
              style={{
                height: 30,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#fff' }}>No more articles</Text>
            </View>
          ) : (
            <ActivityIndicator size='large' loading={loading} />
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#1a2035',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
})
