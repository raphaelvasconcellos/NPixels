import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
    "https://npixelsagencia.files.wordpress.com/2018/09/41307185_1817317031651566_867840095397347328_n.jpg",
    "https://npixelsagencia.files.wordpress.com/2018/10/whatsapp-image-2018-10-01-at-16-58-59.jpeg?w=1000",
];

export default class Slider extends React.Component {
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{uri:( image ) }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});