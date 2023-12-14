import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordItem";

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const { getItems, removeItem } = useStorage();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItems("@pass");
      setListPasswords(passwords);
    }
    loadPasswords();
  }, [isFocused]);

  async function handleDeletePassword(item) {
    const passwords = await removeItem("@pass", item);
    setListPasswords(passwords);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styled.header}>
        <Text style={styled.title}>Minhas Senhas</Text>
      </View>
      <View style={styled.content}>
        <FlatList
          style={{ flex: 1, paddingRight: 14, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  header: {
    backgroundColor: "#392DE9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
