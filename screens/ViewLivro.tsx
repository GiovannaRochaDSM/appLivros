import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import axios from 'axios';

export default function ViewLivro({ route, navigation }) {
  const { id } = route.params;
  const [livro, setLivro] = useState(null);
  const [heartColor, setHeartColor] = useState('black'); 
  const [rating, setRating] = useState(0);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  useEffect(() => {
    fetchLivro();
  }, []);

  const fetchLivro = async () => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${id}`);
      const livroImagem = response.data;
      livroImagem.imagem = `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livroImagem.imagem}`;
      setLivro(response.data);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };
  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'black' ? 'red' : 'black');
  };
  const handleRating = (value) => {
    setRating(value);
  };

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      {livro && (
        <>
          <Card style={styles.card}>
            <Text style={styles.cardText}>
              <Text>{livro.material || '-'}</Text>
            </Text>
            <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleRating(star)}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={rating >= star ? 'star' : 'star-o'}
                        size={20}
                        color={rating >= star ? '#FFD700' : '#C0C0C0'}
                        style={styles.starIcon}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: livro.imagem }}
                style={[styles.image, styles.shadow]}
                resizeMode="contain" 
              />
            </View>
            <Card.Content style={styles.content}>
              <View style={styles.titleContainer}> 
                <Text style={styles.titulo}>{livro.titulo}</Text>
                <TouchableOpacity onPress={toggleHeartColor}>
              <Icon name="heart" size={20} color={heartColor} style={styles.heartIcon} />
            </TouchableOpacity>
                
              </View>
              <Text style={styles.rotulo}>Autor: <Text style={styles.valor}>{livro.autorPrincipal || '-'}</Text></Text>
              <Text style={styles.rotulo}>Ano: <Text style={styles.valor}>{livro.ano || '-'}</Text></Text>
              <Text style={styles.rotulo}>Editora: <Text style={styles.valor}>{livro.editora || '-'}</Text></Text>
              <Text style={styles.rotulo}>ISBN: <Text style={styles.valor}>{livro.isbnIssn || '-'}</Text></Text>
              <Text style={styles.rotulo}>Material: <Text style={styles.valor}>{livro.material || '-'}</Text></Text>
              <Text style={styles.rotulo}>Edição: <Text style={styles.valor}>{livro.edicao || '-'}</Text></Text>
            </Card.Content>
          </Card>
          <Button onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    overflowX: 'hidden'
  },
  card: {
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#A9A9A9',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
    backgroundColor: '#F8F8FF'
  },
  cardText: {
    fontSize: 12,
    color: '#808080',
    fontStyle: 'italic',
    fontFamily: 'Poppins_400Regular',
    marginTop: 20,
    marginLeft: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 11,
  },
  image: {
    width: '150%',
    height: 200,
    borderRadius: 10, 
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 3,
  },
  content: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  titulo: {
    marginTop: 17,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
    color: '#363636',
    flex: 1,
  },
  heartIcon: {
    margin: 15,
    alignSelf: 'flex-end',
  },
  rotulo: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
    color: '#363636'
  },
  valor: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'normal',
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    borderWidth: 1, 
  },
  buttonText: {
    color: '#363636',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  starIcon: {
    marginLeft: 5,
  },
});