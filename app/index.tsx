// index.tsx
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ✅ Interface du type Place
interface Place {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default function Home() {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          "https://69086a582d902d0651b03223.mockapi.io/api/v1/places"
        );
        setPlaces(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#06681F" />
        <Text style={{ marginTop: 10, color: "#06681F" }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Beni Mellal - Tourism</Text>
      </View>

      {/* ✅ Liste */}
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/details?id=${item.id}`)}
            style={styles.card}
          >
            <Image
              source={{ uri: item.images?.[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#033A06",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: (width - 40) / 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#06681F",
    marginVertical: 8,
    textAlign: "center",
  },
});
