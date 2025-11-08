import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { height } = Dimensions.get("window");

interface Place {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  // Animation values
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(
          "https://69086a582d902d0651b03223.mockapi.io/api/v1/places"
        );
        const data = res.data.find((p: Place) => p.id === id);
        setPlace(data || null);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  // active animation when data is loaded
  useEffect(() => {
    if (!loading && place) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, place]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#06681F" />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Place not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/*  img */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        {/* text palce on pic */}
        <View style={styles.textOverImage}>
          <Text style={styles.title}>{place.name}</Text>
        </View>
      </View>

      {/* Modal */}
      <Animated.View
        style={[
          styles.modalBox,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.description}>{place.description}</Text>
        <TouchableOpacity style={styles.bttnGalery} >
       <Text style={styles.TextBtnGalery} 
        onPress={() => router.push(`/gallery?id=${id}`)}>Gallery 📷</Text>

                

            </TouchableOpacity>
      </Animated.View>

       
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  imageContainer: {
    height: 400, 
   
    
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // طبقة غامقة خفيفة
  },
  textOverImage: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign:"center",
  },

  modalBox: {
    backgroundColor: "#FFFFEF",
    height: 600,
    marginTop: -20, // 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  bttnGalery: {
  width: 150,
  height: 50,
  color:"white",
  borderRadius: 15,
  marginVertical: 80,
  marginHorizontal: 100,
  backgroundColor: "green",
  justifyContent: "center",
  alignItems: "center",},

  TextBtnGalery:{
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
});
