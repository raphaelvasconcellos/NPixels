import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal
} from 'react-native'


const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
        style={styles.modalBackground}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
    <View style={styles.container}>
        <ActivityIndicator styles={styles.loader} animating={loading} size="large" color="#800080" />
      </View>
      </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff'
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  }

});


export default Loader;



