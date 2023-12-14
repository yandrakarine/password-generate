import { Text, StyleSheet, Pressable } from "react-native";
export function PasswordItem({ data, removePassword }) {
  return (
    <Pressable onLongPress={removePassword} style={style.container}>
      <Text style={style.dataText}>{data}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dataText: {
    color: "#FFF",
  },
});
