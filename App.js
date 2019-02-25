import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import List from './components/List'

const client = new ApolloClient({
  uri: 'http://192.168.42.24:4000'
})

const TASK_QUERY = gql`
  query GetAllTasks {
    tasks {
      note
      createAt
    }
  }
`

export default class App extends React.Component {

  state = {
    tasks: [
      'Work',
      'Deploy',
      'Test'
    ]
  }

  onAddTask = (note) => {
    const { tasks } = this.state

    this.setState({
      tasks: [ note, ...tasks ]
    })
  }

  onRemoveTask = (index) => {
    const { tasks } = this.state

    this.setState({
      tasks: tasks.filter((task, i) => i !== index),
    })
  }

  render() {
    const { tasks } = this.state
    return (
      <ApolloProvider client={client} style={styles.container}>
        <List list={ tasks } onPressItem={this.onRemoveTask} />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
