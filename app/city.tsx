import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "../assets/images/beni-mellal.jpg";


export default function BeniMellalMap() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/beni-mellal.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
<Text style={{color:"green",fontSize:24, fontWeight:"bold", textAlign:"center", marginTop:4}}>
         La perle d'Atlas
        </Text>
        <Text style={styles.description}>
          Découvrez Beni Mellal, une ville marocaine nichée entre montagnes et
          plaines, riche en histoire et en culture. Explorez ses paysages
          naturels, ses sites historiques et sa cuisine locale pour une
          expérience inoubliable.
        </Text>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 32.3372, //  localisation geo
            longitude: -6.3498,
            latitudeDelta: 0.05, // Zoom vertical
            longitudeDelta: 0.05, // zoom hori
          }}
        >
          <Marker
            coordinate={{ latitude: 32.3372, longitude: -6.3498 }}
            title="Beni Mellal"
            description="Bienvenue à Beni Mellal "
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    padding: 15,
    textAlign: "justify",
    color: "#333",
  },
  map: {
    width: "100%",
    height: 500,
  },
});
