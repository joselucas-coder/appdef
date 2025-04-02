import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet 
} from "react-native";

import { useFonts, Jost_400Regular, Jost_700Bold } from "@expo-google-fonts/jost"; 


const membrosTimes = [
  {
    id: "1",
    name: "Camila Andrade",
    role: "Redatora e Especialista em SEO",
    image: require("./assets/pessoa1.png"),
 
  },
  {
    id: "2",
    name: "Elisa Ramos",
    role: "Gerente de Projetos",
    image: require("./assets/pessoa2.png"),
  
  },
  {
    id: "3",
    name: "Bruno Ferreira",
    role: "Designer Gráfico",
    image: require("./assets/pessoa4.png"),

  },
  {
    id: "4",
    name: "Ana Clara Souza",
    role: "Desenvolvedora Front-end",
    image: require("./assets/pessoa3.png"),
  
  },
  {
    id: "5",
    name: "Diego Martins",
    role: "Desenvolvedor Back-end",
    image: require("./assets/pessoa5.png"),
 
  },
  {
    id: "6",
    name: "Luciana Souza",
    role: "Desenvolvedora Back-end",
    image: require("./assets/pessoa6.png"),
 
  }
];



const TeamList = () => {

  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_700Bold });
  if (!fontsLoaded) { return null; }

  return (
    <View style={styles.containerTime}>
      <Text style={styles.cabecalhoTime}>Equipe</Text>
      <FlatList
        data={membrosTimes}
        renderItem={({ item }) => (
          
            <View style={styles.membrosTime}>
              <Image source={item.image} style={styles.ImagemTime} />
              <Text style={styles.nomes_do_Time}>{item.name}</Text>
              <Text style={styles.funcaonotime}>{item.role}</Text>
            </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTime: {
    borderRadius: 30,
    marginTop: 5,
    backgroundColor: "white",
    
  },
  cabecalhoTime: {
    fontSize: 30,
    fontFamily: "Jost_700Bold",
    textAlign: "center",
    marginTop: 20,

  },
  membrosTime: {
    
    backgroundColor: "#f0ecec",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    justifyContent:"center",
    width:460,

  },
  nomes_do_Time: {
    fontSize: 20,
    fontFamily: "Jost_700Bold"
  },
  funcaonotime: {
    fontSize: 16,
    fontFamily: "Jost_400Regular",
    color: "#666"
  },
  ImagemTime: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginBottom: 5
  },

});

export default TeamList;