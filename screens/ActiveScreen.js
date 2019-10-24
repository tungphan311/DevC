import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import TodoItem from '../components/TodoItem'

class ActiveScreen extends React.Component {
  state = {
    actives: [],
    todoList: []
  }

  componentWillReceiveProps = async nextProps => {
    if (nextProps.isFocused) {
      try {
        const stringArray = await AsyncStorage.getItem('todos')

        let actives = JSON.parse(stringArray)
        actives = actives.filter(x => x.status === 'Active')

        this.setState({ actives, todoList: JSON.parse(stringArray) })
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
    const { actives } = this.state
    return (
      <View style={styles.container}>
        {actives.map((active, idx) => (
          <TodoItem
            idx={idx}
            todo={active}
            key={active.body}
            onToggleTodo={this.onToggleTodo}
          />
        ))}
      </View>
    )
  }
}

ActiveScreen.navigationOptions = {
  title: 'Active Tasks'
}

export default withNavigationFocus(ActiveScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
