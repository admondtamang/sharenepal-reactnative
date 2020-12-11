import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { useNavigation } from "@react-navigation/native";

export default function Login({ route }) {
  const navigation = useNavigation();
  const [userData, setuserData] = useState({});
  const firebaseConfig = {
    apiKey: "AIzaSyCd8UtIZ3cnzG88vX_ymi8LRRkOEtVsTrY",
    authDomain: "share-karobar.firebaseapp.com",
    databaseURL: "https://share-karobar.firebaseio.com",
    projectId: "share-karobar",
    storageBucket: "share-karobar.appspot.com",
    messagingSenderId: "852699577778",
    appId: "1:852699577778:web:46601cf09ce954e6b338ab",
    measurementId: "G-Z7FR362L19",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }

    // Do other things
  });

  async function loginWithFacebook() {
    await Facebook.initializeAsync("748900255837066", "Share Karobar");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          useNavigation("");
        })
        .catch((e) => console.log(e));
      console.log(credential);
      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          // Handle Errors here.
        });
      navigation.navigate("Home");
    }
  }
  return (
    <View>
      <Button onPress={loginWithFacebook} title="Login with facebook" />
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
