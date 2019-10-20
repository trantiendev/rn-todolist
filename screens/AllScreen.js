import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from 'react-native';
import { TODOS } from '../utils/data';
import TodoItem from '../components/TodoItem';

export default class AllScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: TODOS,
      inputText: '',
    };
  }

  onChange = (text) => {
    this.setState({
      inputText: text
    })
  }

  onSubmit = () => {
    const { todoList } = this.state;

    const newTodoItem = {
      body: this.state.inputText,
      status: 'Active',
      id: todoList.length + 1
    };

    const newTodoList = [...todoList, newTodoItem];
    this.setState({
      todoList : newTodoList,
      inputText: '',
    })
  }

  onPressTodoItem = id => {
    const { todoList } = this.state;

    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    this.setState({
      todoList : newTodoList,
    },
      () => {
        setTimeout(() => {
          this.props.navigation.navigate('Details', {data : todo})
        }, 1000)
      }
    )
  }

  onDeleteTodo = id => {
    const { todoList } = this.state;

    const newTodoList = todoList.filter(todo => todo.id !== id);
    this.setState({
      todoList : newTodoList,
    })
  }

  onLongPressTodoItem = todo => {
    Alert.alert(
      'Delete your todo?',
      todo.body,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  }

  render() {
    const { todoList, inputText } = this.state;
    return (
      <KeyboardAvoidingView
      enabled
      behavior="padding"
      >
      <ScrollView contentContainerStyle={styles.container}>

        {todoList.map((todo, idx) => {
          return <TodoItem 
          key={todo.body} 
          data={todo} 
          idx={idx} 
          onChangeStatus={ ()=> this.onPressTodoItem(todo.id) }
          onLongPress={ ()=> this.onLongPressTodoItem(todo) } 
          />;
        })}

        <View style={styles.inputContainer}>
          <TextInput style={styles.todoInput} onChangeText={this.onChange} value={inputText} />
          <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50
  },
  
  todoInput: {
    width: '95%',
    minHeight: 30,
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },

  inputContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
