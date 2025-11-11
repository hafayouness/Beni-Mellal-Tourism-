import { router, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Attraction, useAttractionsStore } from "../store/AttractionsStore";

export default function AttractionsList() {
  const { attractions, loading, error, fetchAttractions } =
    useAttractionsStore();
  const router = useRouter();

  useEffect(() => {
    fetchAttractions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Chargement des attractions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (attractions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune attraction trouvée</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardsContainer}>
      {attractions.map((item: any, index: any) => (
        <AttractionCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
}

function AttractionCard({ item, index }: { item: Attraction; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 50,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={() =>
          router.push({
            pathname: "/details",
            params: { id: item.id },
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: { marginTop: 12, color: "#666", fontSize: 14 },
  errorContainer: { padding: 20, alignItems: "center" },
  errorText: { color: "#ef4444", fontSize: 16, textAlign: "center" },
  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { textAlign: "center", color: "#666", fontSize: 16 },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: "46%",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  title: { fontSize: 16, fontWeight: "600", marginTop: 8, color: "#1f2937" },
  desc: { fontSize: 13, color: "#555", marginTop: 4, lineHeight: 18 },
});
