import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AttractionsList from "../app/AttractionList";
import SplashScreen from "../components/SplashScreen";

export default function Index() {
  const [loadingSplash, setLoadingSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSplash(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 6000);
    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim]);

  if (loadingSplash) {
    return (
      <View style={styles.splashContainer}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#4a90e2" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.headerContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.headerGradient} />
          <Text style={styles.headerTitle}>Béni Mellal</Text>
          <Text style={styles.headerSubtitle}>Explorez votre ville</Text>
        </Animated.View>

        <AttractionsList />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#4a90e2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2b8a3e",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#e0e0e0",
    fontSize: 16,
    textAlign: "center",
  },
});
