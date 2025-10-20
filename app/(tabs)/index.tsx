import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Hello ,</Text>
      <Text style={styles.sub}>World !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 52,
    fontWeight: "bold",
    color: "black",
  },
  sub: {
    color: "black",
    fontSize: 52,
    fontWeight: "bold",
  },
});
