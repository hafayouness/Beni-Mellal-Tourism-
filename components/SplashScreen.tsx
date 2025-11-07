import { MapPin } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const translateY = useRef(new Animated.Value(-height)).current; // image + contenu en haut
  const overlayOpacity = useRef(new Animated.Value(0)).current; // overlay fade in
  const textOpacity = useRef(new Animated.Value(0)).current; // texte fade in
  const textTranslateY = useRef(new Animated.Value(20)).current; // texte slide up
  const scaleAnim = useRef(new Animated.Value(0.95)).current; // effet zoom léger

  useEffect(() => {
    // Animation principale de l'image (spring)
    Animated.spring(translateY, {
      toValue: 0,
      damping: 15,
      stiffness: 90,
      mass: 1,
      overshootClamping: false,
      useNativeDriver: true,
    }).start();

    // Overlay fade-in
    Animated.timing(overlayOpacity, {
      toValue: 0.5,
      duration: 600,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Scale image pour effet dynamique
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Texte slide-up et fade-in après image
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Animated.Image
        source={require("../assets/images/image1.jpeg")}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="cover"
      />

      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />

      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <View style={styles.location}>
          <MapPin color="#34d399" size={22} />
          <Text style={styles.city}>Béni Mellal</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    position: "relative",
  },
  image: {
    width,
    height,
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 80,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  city: {
    color: "#a7f3d0",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
