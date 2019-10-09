import * as React from 'react';
import Slider from './Slider';
import { Text, 
        View, 
        StyleSheet, 
        Image,
        Button,
        FlatList,
        TouchableOpacity,
        TouchableWithoutFeedback,
        TextInput,
        Dimensions,
        Keyboard,
        SafeAreaView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';      
import DetailsNews from './DetailsNews';  
import Loader from './Loader';     
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window')

export default class ListNews extends React.Component {

   state = {
      noticias : [],
      text:'',
      fdata: [],
      search: false,
      button: true,
      loading: true
  } 

   renderItens = (item) => {
     if(item === undefined){
       return(<Text>Nenhuma noticia</Text>);
     } else{
     return(
       
       <TouchableOpacity onPress={() => {
         this.props.navigation.navigate('DetailsNews', {news: item.id})
       }}>
       <View style={styles.listNews}>
            
            <View>
            <Image
              style={styles.listImg}
              source={{uri:'data:image/'+ item.imagem.tipo
              + ';base64,' + item.imagem.data}}
            />
            </View>
            <View>
             <Text style={styles.titleNews}>{item.titulo}</Text>
             <Text style={styles.textNews}>{item.resumo}</Text>
            </View>
            <Icon 
            style={styles.arrowList}
            name="chevron-right"
            color= '#800080'
            size={18}
            />
            
       </View>
       </TouchableOpacity>
     );
   }   
}

  
 componentDidMount() {
   fetch('http://tarley.eti.br/npixels/noticias.json', {
      method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          noticias: responseJson.noticias,
          fdata: responseJson.noticias
        });
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
 } 

handleSearch(text){
        const data = this.state.fdata
        console.log(this.state.fdata)
        const newData = data.filter(function(item){
            const itemData = item.titulo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            noticias: newData,
            text: text,
        })
}
searchActive(){
 this.setState({ search: true })
 this.setState({ button: false })
}
cancelSearch(){
  this.setState({text: '', noticias: this.state.fdata});
  this.setState({ search: false })
  this.setState({ button: true })
  Keyboard.dismiss();
}
deleteSearch(){
  this.setState({text: '', noticias: this.state.fdata});
}
  
  render() {
    return (
     
       <View style={styles.container}>
       <Loader loading={this.state.loading} />
        {this.state.button ? 
        <View style={styles.searchClick}>
          <TouchableWithoutFeedback onPress={() => this.searchActive()}>
            <Icon
              name= "search"
              color= '#800080'
              size={30}
            />
          </TouchableWithoutFeedback>
        </View>
        : null}
        {this.state.search ? 
        <Animatable.View animation={this.state.search ? "fadeInLeft" : "fadeOutRight"} duration={400} style={styles.searchView}>
        <Icon
          name= "search"
          color= '#800080'
          size={18}
          style={styles.searchIcon}
        />
        <TextInput 
         style={styles.searchInput}
         placeholder='Buscar...' 
         value={this.state.text}
         onChangeText={(text) => this.handleSearch(text)}
         />
         {this.state.text ?  
          <TouchableWithoutFeedback onPress={() => this.deleteSearch()}>
              <Icon 
                name= "times-circle"
                color= '#800080'
                size={18}
                style={styles.cancelIcon}
                />
          </TouchableWithoutFeedback>
        :null}

         <TouchableWithoutFeedback onPress={() => this.cancelSearch()}>
            <View style={styles.container}>
                
                <Text style={styles.searchCancel}>Cancelar</Text>
             
            </View>    
          </TouchableWithoutFeedback>>
         </Animatable.View>
         : null}
         <FlatList
        style={styles.flat}
        data={this.state.noticias}
        renderItem={({item}) => this.renderItens(item)}
        keyExtractor = { item => item.id }
        />  
      
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    },
    flat: {
      padding: 5,
    },
    titleNews: {
      fontSize: 16,
      fontWeight: '500',
      paddingLeft: 5,
      width: 300,
      
      flexWrap: 'wrap',
      color: '#800080',
    },
     textNews: {
      fontSize: 14,
      paddingLeft: 5,
    },
    listNews:{
      flex: 1, 
      flexDirection: 'row', 
      padding:5,
      paddingTop: 10,
      paddingBottom: 10,  
      borderBottomWidth: 0.5, 
      borderBottomColor: '#800080',
      borderTopWidth: 0.5, 
      borderTopColor: '#800080',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listImg:{
      width: 50, 
      height: 50,
    },  
    arrowList: {
      justifyContent: 'center',
    
    },
      cancelIcon: {
      position: 'absolute',
      right: 90,
      zIndex: 1,
      
    },
    searchIcon: {
      position: 'absolute',
      top: 15,
      left: 15,
      zIndex: 1,
      
    },
    searchClick: {
      paddingHorizontal: 5,
      alignItems: 'center',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    searchInput: {
      borderColor: '#800080',
      borderWidth: 1,
      borderRadius:10,
      height: 40,
      width: width - (width / 4),
      backgroundColor: '#FFFFFF',
      paddingLeft: 30,
      marginLeft: 5,
      
    },
    searchCancel:{
      position: "absolute",
      color: '#800080',
      fontSize: 15,
      right: 5,
    },
    searchView: {
      paddingHorizontal: 5,
      alignItems: 'center',
      height: 50,
      flexDirection: 'row',
    }
  
  
});
