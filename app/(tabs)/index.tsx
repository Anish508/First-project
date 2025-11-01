import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useThemes";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Hello ,</Text>
      <Text style={styles.sub}>World !</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle to dark mode</Text>
      </TouchableOpacity>
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
