import { useAuthSession } from "@/providers/authctx";
import { authenticationStyle as styles } from "@/styles/authentication";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, createUser, signInWithGoogle } = useAuthSession();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>DugnadsHub</Text>
            <Text style={styles.subtitle}>
              {isSignUp ? "Bli med i fellesskapet" : "Velkommen tilbake"}
            </Text>
          </View>

          {isSignUp && (
            <View style={styles.textFieldContainer}>
              <Text style={styles.label}>Brukernavn</Text>
              <TextInput
                value={userName}
                onChangeText={setUserName}
                style={styles.textField}
                placeholder="Velg et brukernavn"
              />
            </View>
          )}

          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>E-post</Text>
            <TextInput
              value={userEmail}
              onChangeText={setUserEmail}
              style={styles.textField}
              placeholder="din@epost.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Passord</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.textField}
              placeholder="Ditt passord"
              autoCapitalize="none"
            />
          </View>

          <Pressable
            style={styles.toggleButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.toggleText}>
              {isSignUp
                ? "Har du allerede en konto? Logg inn"
                : "Trenger du en konto? Registrer deg"}
            </Text>
          </Pressable>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => {
                if (isSignUp) {
                  createUser(userEmail, password, userName);
                } else {
                  signIn(userEmail, password);
                }
              }}
            >
              <Text style={styles.primaryButtonText}>
                {isSignUp ? "Lag bruker" : "Logg inn"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.googleButton}
              onPress={async () => {
                await signInWithGoogle();
              }}
            >
              <Text style={styles.googleButtonText}>Fortsett med Google</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Authentication;
