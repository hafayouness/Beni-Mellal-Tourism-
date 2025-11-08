import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Gallery() {
  const images: ImageSourcePropType[] = [
    require("./assets/images/1.jpg"),
    require("./assets/images/2.jpg"),
    require("./assets/images/3.jpg"),
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images[currentIndex]} style={styles.image} />

        {/* ❤️ bouton coeur */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setLiked(!liked)}
        >
          <AntDesign name="heart" size={30} color={liked ? "red" : "white"} />
        </TouchableOpacity>

        {/* 🔘 points navigation */}
        <View style={styles.overlayDots}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity>
        <Text>Voir mes favoris</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: {
    marginTop: 80,
    width: width * 0.9,
    height: 350,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  heartButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 30,
  },
  overlayDots: {
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#7d3535ff",
    width: 20,
    height: 20,
  },
});
