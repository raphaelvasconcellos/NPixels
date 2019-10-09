import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Loader from './Loader'

export default class DetailsNews extends React.Component {
   state = {
      newsSelected: {},
      loading: true
  };


componentDidMount() {
  const itemId = this.props.navigation.getParam('news');
  const service = `http://tarley.eti.br/npixels/noticias/${itemId}.json`;
  
   fetch(service, {
      method: 'GET'
      
      })
      
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          newsSelected: responseJson,
        });
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
 }  

 title(noticia) {
    if(noticia && noticia.titulo) {
      return (
      <View>
        <Text style={styles.title}>{noticia.titulo}</Text> 
      </View>
      )
    }    
  }

  date(noticia) {
    if(noticia && noticia.data) {
      return (
        <View>
          <Text style={styles.date}>Publicado em: {noticia.data}</Text>
        </View>
      )
    }    
  }

  publisher(noticia) {
    if(noticia && noticia.publicadoPor) {
      return (
        <View>
          <Text style={styles.publisher}>Por: {noticia.publicadoPor}</Text>
        </View>
      )      
    }
  }

  authors(noticia) {
    let authors = '';
      if(noticia && noticia.autores) 
        authors += noticia.autores.map(a => ' ' + a.nome + ' - ' + a.cargo);    
      return (
        <View>
          <Text style={styles.authors}>Por: {authors}</Text>
        </View>
    );
  }

  content(noticia) {
    let content = '\n';
    let imagem = {};
      if(noticia && noticia.conteudo) {
        for(let i = 0; i<noticia.conteudo.length; i++) {        
          content += noticia.conteudo[i].texto + '\n\n';
          if(noticia.conteudo[i].imagens) {
            imagem = noticia.conteudo[i].imagens;
          }
        }
        return (
          <View style={styles.divConteudo}>
            <Text style={styles.contentText}>{content}</Text>  
          </View>  
        );      
      }       
  }

  render() {
    return (
      
       <ScrollView>
          <View style={styles.container}>
          <Loader loading={this.state.loading} />
            {this.title(this.state.newsSelected)}
            {this.date(this.state.newsSelected)}
            {this.publisher(this.state.newsSelected)}
            {this.authors(this.state.newsSelected)}
            {this.content(this.state.newsSelected)}
          </View>
       </ScrollView>    
    );
  }
}
 


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',   
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      padding: 25,
      paddingBottom: 5,
      textAlign: 'center',
      alignItems: 'flex-start',
      color: '#800080',
    },
    date: {
      fontSize: 12,
      fontWidth: 'italic',
      textAlign: 'center',
      color: '#303030',
    },
    publisher: {
      fontSize: 12,
      textAlign: 'center',
      paddingBottom: 10,
      color: '#303030',
    },
      authors: {
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'justify',
      padding: 20,
      paddingBottom: 0,
      color: '#303030',
    },
    contentText: {
      fontSize: 16,
      padding: 20,
      textAlign: 'justify',
      color: '#303030',

    }
    
});
