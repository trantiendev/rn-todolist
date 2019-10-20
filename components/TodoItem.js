import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class TodoItem extends Component {
  render() {

    const {
      data: { body, status },
      idx,
      onChangeStatus,
      onLongPress
    } = this.props

    const statusStyle = {
      backgroundColor: status === 'Done' ? 'blue' : 'green'
    };
    
    return (
      <TouchableOpacity
        key={body}
        style={[styles.todoItem, statusStyle]}
        onPress={onChangeStatus}
        onLongPress={onLongPress}
      >
        <Text style={styles.todoText}>
          {idx + 1}: {body}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});
