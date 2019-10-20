import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView
} from 'react-native'
import { TODOS } from '../utils/data'
import TodoItem from '../components/TodoItem'

export default function AllScreen (props) {
  const [todoList, setTodoList] = useState(TODOS)
  const [todoBody, setTodoBody] = useState('')

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id)
    todo.status = todo.status === 'Done' ? 'Active' : 'Done'
    const foundIndex = todoList.findIndex(todo => todo.id === id)
    todoList[foundIndex] = todo
    const newTodoList = [...todoList]
    setTodoList(newTodoList)

    props.navigation.navigate('SingleTodo', {
      updatedTodo: todo
    })
  }

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList)
  }

  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    }
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList)
    setTodoBody('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={todoBody}
        style={styles.todoInput}
        onChangeText={text => setTodoBody(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1 }}>
          {todoList.map((todo, idx) => {
            return (
              <TodoItem
                idx={idx}
                todo={todo}
                key={todo.body}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

AllScreen.navigationOptions = {
  title: 'All Todos'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    paddingHorizontal: 15
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
