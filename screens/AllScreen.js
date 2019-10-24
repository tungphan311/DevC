import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView
} from 'react-native'
import TodoItem from '../components/TodoItem'
import { AsyncStorage } from 'react-native'
import { withNavigationFocus } from 'react-navigation'

class AllScreen extends React.Component {
  state = {
    todoList: [],
    todoBody: ''
  }

  onToggleTodo = async id => {
    const { todoList } = this.state

    const todo = todoList.find(todo => todo.id === id)
    todo.status = todo.status === 'Done' ? 'Active' : 'Done'
    const foundIndex = todoList.findIndex(todo => todo.id === id)
    todoList[foundIndex] = todo
    const newTodoList = [...todoList]

    this.setState({ todoList: newTodoList })

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodoList))
    } catch (err) {
      alert(err)
    }

    this.props.navigation.navigate('SingleTodo', {
      updatedTodo: todo
    })
  }

  onDeleteTodo = async id => {
    const { todoList } = this.state

    const newTodoList = todoList.filter(todo => todo.id !== id)

    this.setState({ todoList: newTodoList })

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodoList))
    } catch (err) {
      alert(err)
    }
  }

  onSubmitTodo = async () => {
    const { todoBody, todoList } = this.state

    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    }
    const newTodoList = [...todoList, newTodo]

    this.setState({ todoList: newTodoList })

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodoList))
    } catch (err) {
      alert(err)
    }

    this.setState({ todoBody: '' })
  }

  render () {
    const { todoBody, todoList } = this.state

    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            value={todoBody}
            style={styles.todoInput}
            onChangeText={text => this.setState({ todoBody: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={{ flex: 1 }}>
            {todoList.map((todo, idx) => {
              return (
                <TodoItem
                  idx={idx}
                  todo={todo}
                  key={todo.body}
                  onToggleTodo={this.onToggleTodo}
                  onDeleteTodo={this.onDeleteTodo}
                />
              )
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

AllScreen.navigationOptions = {
  title: 'All Todos'
}

export default withNavigationFocus(AllScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'white'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20,
    borderColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  button: {
    marginBottom: 20,
    height: 40,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1
  }
})
