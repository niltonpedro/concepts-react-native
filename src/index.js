import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, StatusBar, FlatList } from 'react-native'

import api from "./services/api";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then( response => {
      console.log(response.data)
      setProjects(response.data)

    })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={ project => project.id}
          renderItem={ ({item}) => (
            <Text style={styles.title}>{item.title}</Text>
          )}
        />
      </SafeAreaView>
      
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#707070",
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  }
})
