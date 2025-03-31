import React, { useState } from "react"; import { View, Text, TextInput, Image, FlatList, StyleSheet,TouchableOpacity,ScrollView,Modal,Button, Switch} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider'; import {Picker} from '@react-native-picker/picker';

import { useFonts, Jost_400Regular, Jost_700Bold } from "@expo-google-fonts/jost"; 

import { Ionicons } from "@expo/vector-icons";

const products = 
[ { id: "1", name: "Puma Suede", price: 449, colors: ["Preto", "Amarelo", "Verde"], images: { Preto: require("./assets/puma.png"), Amarelo: require("./assets/puma_amarelo.png"), Verde: require("./assets/puma_verde.png"), } }, 


{ id: "2", 
  name: "Adidas Rivalry", 
  price: 599, 
  colors: ["Preto", "Vermelho", "Branco"], 
  images: { 
      Branco: require("./assets/adidasbranco.png"), 
      Vermelho: require("./assets/adidasbrancover.png"), 
      Preto: require("./assets/adidaspreto.png"), } },

{ id: "3", name: "Nike Blazer GT", price: 599, colors: ["Branco", "Verde", "Preto"], images: { Branco: require("./assets/nike_branco.png"), Verde: require("./assets/nike_verde.png"), Preto: require("./assets/nike_preto.png"), } }, 
{ id: "4", name: "Nike AF-1", price: 599, colors: ["Branco", "Rosa", "Preto"], images: { Branco: require("./assets/airforce_branco.png"), Rosa: require("./assets/airforce_rosa.png"), Preto: require("./assets/airforce_preto.png"), } }, 
{ id: "5", name: "Adidas Superstar", price: 599, colors: ["Preto", "Vermelho", "Marrom"], images: { Preto: require("./assets/superstar_preto.png"), Vermelho: require("./assets/superstar_vermelho.png"), Marrom: require("./assets/superstar_marrom.png"), } }, 
{ id: "6", name: "Adidas Gazelle", price: 599, colors: ["Preto", "Verde", "Vermelho"], images: { Preto: require("./assets/gazelle_preto.png"), Verde: require("./assets/gazelle_verde.png"), Vermelho: require("./assets/gazelle_vermelho.png"), } }, 
{ id: "7", name: "Puma Palermo", price: 599, colors: ["Preto", "Branco", "Verde"], images: { Preto: require("./assets/palermo_preto.png"), Branco: require("./assets/palermo_branco.png"), Verde: require("./assets/palermo_verde.png"), } }, 
{ id: "8", name: "Nike Air-Max 1", price: 599, colors: ["Preto", "Creme", "Bege"], images: { Preto: require("./assets/airmax1_preto.png"), Creme: require("./assets/airmax1_creme.png"), Bege: require("./assets/airmax1_bege.png"), } },
{ id: "9", name: "Nike Air-Max 1", price: 599, colors: ["Mike", "Sully", "Pelinho"], images: { Mike: require("./assets/crocs_mike.png"), Sully: require("./assets/crocs_sully.png"), Pelinho: require("./assets/crocs_pelinho.png"), } },
{ id: "10", name: "Nike Air-Max 1", price: 599, colors: ["Batata", "J", "Pikachu", "Yodinha"], images: { Batata: require("./assets/jibbitz_batata.png"), J: require("./assets/jibbitz_J.png"), Pikachu: require("./assets/jibbitz_pika.png"), Yodinha: require("./assets/jibbitz_yodinha.png") } },  
];

const teamMembers = [
  { id: "1", name: "Camila Andrade ", role: "Redatora e Especialista em SEO", image: require("./assets/pessoa1.png"), social: "@camis_andrade", contact: "(11) 99999-9999", bio:"Com uma escrita fluida e estratégica, Camila é a mente criativa por trás dos textos do site. Formada em Comunicação Social e com experiência em marketing digital, ela se especializou em SEO para garantir que os conteúdos sejam encontrados com facilidade nos mecanismos de busca. Camila pesquisa constantemente as tendências do mercado para produzir artigos relevantes e de alta qualidade, sempre alinhados às necessidades do público-alvo." },
  { id: "2", name: "Elisa Ramos ", role: "Gerente de Projetos", image: require("./assets/pessoa2.png"), social: "@elisgerencia", contact: "(11) 98888-8888", bio: "Elisa é quem mantém tudo organizado e funcionando dentro dos prazos. Com mais de oito anos de experiência em gestão de projetos, ela coordena a equipe e garante que todas as demandas sejam atendidas com qualidade. Especialista em metodologias ágeis, como Scrum e Kanban, Elisa promove reuniões estratégicas para alinhar as tarefas e otimizar os processos. Seu foco é garantir a eficiência do time e a entrega de um produto final impecável aos usuários do site." },
  { id: "3", name: "Bruno Ferreira", role: "Designer Gráfico", image: require("./assets/pessoa4.png"), social: "@brufr", contact: "(11) 97777-7777",bio: "Bruno é o responsável por toda a identidade visual do site. Graduado em Design Gráfico, ele tem uma paixão especial por criar layouts inovadores e designs atraentes. Sua experiência inclui projetos para diversas marcas, sempre focado em transmitir a mensagem de forma clara e impactante. Além do design digital, Bruno também trabalha com ilustrações e animações, trazendo elementos visuais que tornam a experiência dos usuários mais envolvente e intuitiva." },
  { id: "4", name: "Ana Clara Souza ", role: "Desenvolvedora Front-end", image: require("./assets/pessoa3.png"), social: "@ana_clarasz", contact: "(11) 97777-7777", bio: "Apaixonada por tecnologia e inovação, Ana Clara é especialista em desenvolvimento front-end, criando interfaces modernas e responsivas para proporcionar a melhor experiência ao usuário. Com formação em Ciência da Computação e mais de cinco anos de experiência no setor, domina tecnologias como HTML, CSS, JavaScript e frameworks como React e Vue.js. Além do seu trabalho técnico, Ana também contribui com artigos e tutoriais sobre boas práticas de desenvolvimento, ajudando outros profissionais da área a aprimorar suas habilidades." },
  { id: "5", name: "Diego Martins ", role: "Desenvolvedor Back-end", image: require("./assets/pessoa5.png"), social: "@didimar", contact: "(11) 97777-7777", bio: "Diego é o responsável por toda a estrutura e funcionamento interno do site. Com formação em Engenharia de Software e experiência em linguagens como Python, PHP e Node.js, ele garante que tudo funcione de forma eficiente e segura. Além do desenvolvimento, Diego também cuida da implementação de APIs, gerenciamento de bancos de dados e otimização da performance do site. Seu compromisso é garantir que a plataforma seja estável e escalável, permitindo um crescimento contínuo." },
];
const Card = ({ item, expanded, onPress }) => {
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);
  const [selectedSize, setSelectedSize] = useState(38);

return (     
  <TouchableOpacity style={styles.card} onPress={onPress}>
  <Image source={item.images[selectedColor]} style={styles.image} />
  <Text style={styles.name}>{item.name}</Text>
  <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>

  {expanded && (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Cor:</Text>
      <View style={styles.colorContainer}>
        {item.colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorOption,
              selectedColor === color ? styles.selectedColor : {}
            ]}
            onPress={() => setSelectedColor(color)}
          >
            <Text style={styles.colorText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Tamanho:</Text>
      <View style={styles.sizeContainer}>
        {[35, 36, 37, 38, 39, 40, 41, 42].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeOption,
              selectedSize === size ? styles.selectedSize : {}
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )}
</TouchableOpacity>
);
};

export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isShoes, setIsShoes] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("Nike");
  const [selectedSize, setSelectedSize] = useState(38);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_700Bold });
if (!fontsLoaded) { return null; }

return (

  <ScrollView>
  <View style={styles.container}>
    <View style={styles.container3}>
      <Text style={styles.header}>HypeLab</Text>

      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar tênis..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons style={styles.icone} name="settings" size={25} color="black" />
        </TouchableOpacity>
    </View>
    <View style={styles.container2}>
      <View style={styles.headerContainer2}>
        <Text style={styles.titulocontainer2}>Novos {'\n'}Produtos</Text>
        
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Configurações</Text>

          <View style={styles.settingItem}>
            <Text>Tema Escuro</Text>
            <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
          </View>

          <View style={styles.settingItem}>
            <Text>Exibir Tênis</Text>
            <Switch value={isShoes} onValueChange={setIsShoes} />
          </View>

          <Text>Filtrar por Marca</Text>
          <Picker selectedValue={selectedBrand} onValueChange={setSelectedBrand}>
            <Picker.Item label="Nike" value="Nike" />
            <Picker.Item label="Adidas" value="Adidas" />
            <Picker.Item label="Puma" value="Puma" />
          </Picker>

          <Text>Filtrar por Tamanho</Text>
          <Picker selectedValue={selectedSize} onValueChange={setSelectedSize}>
            {[35, 36, 37, 38, 39, 40, 41, 42].map(size => (
              <Picker.Item key={size} label={size.toString()} value={size} />
            ))}
          </Picker>

          <Text>Itens por Página: {itemsPerPage}</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={itemsPerPage}
            onValueChange={setItemsPerPage}
          />

          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal >

      <FlatList
        data={products.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item }) => (
          <Card
            item={item}
            expanded={expandedProduct === item.id}
            onPress={() => setExpandedProduct(expandedProduct === item.id ? null : item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
    <Text style={styles.teamHeader}>Equipe</Text>
    <FlatList
      data={teamMembers}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelectedMember(selectedMember === item.id ? null : item.id)}>
          <View style={styles.teamMember}>
            <Image source={item.image} style={styles.teamImage} />
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.teamRole}>{item.role}</Text>
            {selectedMember === item.id && (
              <View style={styles.details}>
                <Text style={styles.bio}> {item.bio}</Text>
                <Text style={styles.social}>Rede Social: {item.social}</Text>
                <Text style={styles.contact}>Contato: {item.contact}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  </View>
</ScrollView>
);
}

const styles = StyleSheet.create({

container: { flex: 1, padding: 10, backgroundColor: "black" },

container2:{
backgroundColor:"white",
borderRadius:50,
paddingHorizontal:10,
paddingVertical:20,
},

container3:{ 
  backgroundColor:"white",
  borderRadius:50, 
  marginBottom:5, 
  height:250,
 
},


icone:{

  position: "absolute",
  top: -200,  // Ajuste a altura conforme necessário
  right: 30, // Ajuste a distância da borda direita

},

header: { fontSize: 40, fontFamily: "Jost_700Bold", textAlign: "center", marginTop:35,

marginBottom:30,
color:"black"
},

searchInput: { marginTop:30, height: 80, backgroundColor: "black", borderRadius: 40, fontFamily: "Jost_400Regular", fontSize: 16, width:430, alignSelf: "center", textAlign:"center", color:"white",

},

titulocontainer2:{

textAlign:"left",
fontFamily: "Jost_700Bold",
fontSize:55,
paddingLeft:10,
marginBottom:10,
marginTop:10,
alignItems:"center"
},

card: { 
  flex: 1, 
  backgroundColor: "#f0ecec", 
  margin: 10, 
  padding: 15, 
  borderRadius: 30, 
  alignItems: "center", 
  shadowColor: "#000", 
  shadowOffset: { width: 2, height: 2 }, 
  shadowOpacity: 0.2, 
  shadowRadius: 4, 
  elevation: 3, 
  alignSelf: "flex-start", // Adicionado para evitar que todos os cards cresçam juntos

},

image: 
{ width: 200, height: 200, resizeMode: "contain", marginBottom: 10 },

name: 
{ fontSize: 20, fontFamily: "Jost_700Bold", marginBottom: 5, textAlign: "center" },

price: 
{ fontSize: 17, fontFamily: "Jost_700Bold", color: "black" },

optionsContainer: 
{ width: "100%", 
  marginTop: 10 },

sectionTitle: { 
fontSize: 14, 
fontFamily: "Jost_700Bold", 
marginTop: 10 },

colorContainer: { 
flexDirection: "row", 
justifyContent: "center", 
flexWrap: "wrap", 
marginVertical: 10 },

colorOption: { 
padding: 8, 
margin: 4, 
borderWidth: 1, 
borderRadius: 5 },
selectedColor: { 
backgroundColor: "#ddd" },


sizeContainer: { 
flexDirection: "row", 
justifyContent: "center", 
flexWrap: "wrap" },
sizeOption: { 
padding: 8, 
margin: 4, 
borderWidth: 1, 
borderRadius: 5 },
selectedSize: { backgroundColor: "#ddd" },

sizeText: { fontSize: 14 },

colorText: { fontSize: 14 },

teamHeader: { fontSize: 20, fontFamily: "Jost_700Bold", textAlign: "center", marginTop: 20, color:"white"
},

teamMember: { backgroundColor: "#fff", padding: 10, marginVertical: 5, borderRadius: 25, paddingLeft:15, paddingVertical:20,

},

teamName: { fontSize: 20, fontFamily: "Jost_700Bold",

},

teamRole: { fontSize: 16, fontFamily: "Jost_400Regular", color: "#666" },

teamImage: { width: 70,  height: 70, borderRadius: 30,  marginBottom: 5,},

lightContainer: {
  flex: 1,
  padding: 20,
  backgroundColor: "white",
},
darkContainer: {
  flex: 1,
  padding: 20,
  backgroundColor: "black",
},


headerContainer2: {
  flexDirection: "row", 
  justifyContent: "space-between", 
  alignItems: "center",
  paddingHorizontal: 10, // Ajusta o espaçamento lateral
  marginBottom: 10, // Espaço abaixo do cabeçalho
  

},

modalContainer: {
  flex: 1,
  padding: 20,
  justifyContent: "center",
},
modalTitle: {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 20,
},
settingItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 10,
},
});