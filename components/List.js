import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_ALL_TASKS = gql`
query GetAllTasks {
  tasks{
    note
    createdAt
    doneAt
  }
}
`

export default class List extends Component {

  renderItem = (note, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}>
        <Text>{note}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let self = this
    return (
      <Query query={GET_ALL_TASKS}>
        {({ loading, error, data }) => {
          if (loading) return(<Text>{"Its loading"}</Text>)
          if (error) return(<Text>{"Error"}</Text>)
          return data.tasks.map((task, i) => self.renderItem(task.note, i))
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    padding: 15
  },
})

