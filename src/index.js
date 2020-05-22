import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native'

import api from "./services/api";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then( response => {
      console.log(response.data)
      setProjects(response.data)

    })
  }, [])

  async function handleAddProject() {

    const response = await api.post('projects', {
      title: `Projecto ${Date.now()}`,
      owner: "Niltinho"
    })

    const project = response.data;

    setProjects([...projects, project])
  }


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
        <TouchableOpacity activeOpacity={0.6} onPress={handleAddProject} style={styles.button}> 
          <Text style={styles.title} >Adicionar Projeto</Text>
        </TouchableOpacity>
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
  },

  button: {
    margin: 20,
    borderRadius: 4,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3333"
  }
})
