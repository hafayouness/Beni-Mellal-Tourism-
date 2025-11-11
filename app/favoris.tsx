// Favoris.tsx
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface Place {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default function Favoris() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    const favs: Place[] = stored ? JSON.parse(stored) : [];
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((p) => p.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Pas de favoris pour le moment ❤️</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.fovText}> favoris pour le moment ❤️</Text>

      {favorites.map((place) =>
        place.images.map((img, idx) => (
          <View key={`${place.id}-${idx}`} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
                      <Text style={{color:"green",fontSize:20}}>{place.name}</Text>
            
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => removeFavorite(place.id)}
            >
              <AntDesign name="heart" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    width: (width - 40) / 2,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  heartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  fovText: { fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 40,
  },
});