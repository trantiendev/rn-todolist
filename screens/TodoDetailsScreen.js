import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TodoDetailsScreen extends Component{
  render() {
    const {navigation} = this.props;
    const todoItem = navigation.getParam('data')
    const {
      status,
      body
    } = todoItem
    return (
      <View>
        <Text>{status}</Text>
        <Text>{body}</Text>
      </View>
    )
  }
}

