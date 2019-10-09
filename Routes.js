import * as React from 'react';
import { createStackNavigator} from 'react-navigation';
import { Componet, Image } from 'react-native';

import ListNews from './components/ListNews';
import DetailsNews from './components/DetailsNews';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./logo.png')}
        style={{ width: 80, height: 30 }}
      />
    );
  }
}

export default createStackNavigator({
  ListNews,
  DetailsNews,
}, {
  navigationOptions:{
      headerStyle: {
      backgroundColor: "#f9f9f9"
      },
      headerTitle: <LogoTitle />
  },

});