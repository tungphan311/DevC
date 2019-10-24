import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import TodoItem from '../components/TodoItem'
import { withNavigationFocus } from 'react-navigation'

class CompleteScreen extends Component {
  state = {
    dones: [],
    todoList: []
  }

  componentWillReceiveProps = async nextProps => {
    if (nextProps.isFocused) {
      try {
        const stringArray = await AsyncStorage.getItem('todos')

        let dones = JSON.parse(stringArray)
        dones = dones.filter(x => x.status === 'Done')

        this.setState({ dones, todoList: JSON.parse(stringArray) })
      } catch (err) {
        alert(err)
      }
    }
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

  render () {
    const { dones } = this.state
    return (
      <View style={styles.container}>
        {dones.map((done, idx) => (
          <TodoItem
            idx={idx}
            todo={done}
            key={done.body}
            onToggleTodo={this.onToggleTodo}
            // onDeleteTodo={onDeleteTodo}
          />
        ))}
      </View>
    )
  }
}

CompleteScreen.navigationOptions = {
  title: 'Completed Task'
}

export default withNavigationFocus(CompleteScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
