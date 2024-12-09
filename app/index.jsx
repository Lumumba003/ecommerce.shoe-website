import { View, StyleSheet } from "react-native";
import Navigation from "../src/navigation";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function Index() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
