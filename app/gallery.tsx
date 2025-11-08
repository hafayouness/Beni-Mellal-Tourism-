import { AntDesign } from "@expo/vector-icons"; // icon heart
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Place {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  // Animation
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Aucun ID reçu depuis la navigation");
        setLoading(false);
        return;
      }
      try {
        const url = `https://69086a582d902d0651b03223.mockapi.io/api/v1/places/${id}`;
        const res = await axios.get(url);
        setPlace(res.data);

        // Check favorite
        const stored = await AsyncStorage.getItem("favorites");
        const favs = stored ? JSON.parse(stored) : [];
        const isFav = favs.some((item: Place) => item.id === id);
        setFavorite(isFav);

        // Start animation
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (err: any) {
        console.error("Erreur Axios :", err.message);
        setError("Impossible de charger les détails (404 ou ID invalide)");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      let favs = stored ? JSON.parse(stored) : [];
      if (favorite) {
        favs = favs.filter((item: Place) => item.id !== id);
      } else if (place) {
        favs.push(place);
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(favs));
      setFavorite(!favorite);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Aucune donnée trouvée.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        {place.images.map((img, idx) => (
          <View key={idx}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
              <AntDesign name="heart" size={28} color={favorite ? "red" : "white"} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
     

      {/* Modal box with animation */}
      <Animated.View
        style={[
          styles.modalBox,
          { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
        ]}
      >
        <Text style={styles.title}>{place.name}</Text>

        {/* Go to favoris */}
        <TouchableOpacity
          style={styles.bttnFavoris}
          onPress={() => router.push("/favoris")}
        >
          <Text style={styles.textBtnfavoris}>Go to favoris</Text>
        </TouchableOpacity>
        {/* about ben mellal */}
 <TouchableOpacity
          style={styles.bttnFavoris}
                  onPress={() => router.push("/city" as any)
}
        >
          <Text style={styles.textBtnfavoris}>Map</Text>
        </TouchableOpacity>
       
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width, height: 480, resizeMode: "cover" },
  heartButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 6,
  },
  dotsContainer: { flexDirection: "row",
     justifyContent: "center", 
     marginVertical: 10 },

  activeDot: { backgroundColor: "#fff", borderWidth: 2, borderColor: "green" },
  textContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "bold", color: "#045109", marginBottom: 10, textAlign: "center" },
  description: { fontSize: 16, color: "#555", textAlign: "justify", marginBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  bttnFavoris: {
    width: 200,
    height: 50,
    backgroundColor: "green",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
  },
  textBtnfavoris: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalBox: {
    backgroundColor: "#FFFFEF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
    height: 600,
    marginTop: -20, // display modal from bottom
  },
});
