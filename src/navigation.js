import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";  // Correct import of the selector

const Stack = createNativeStackNavigator();

const Navigation = () => {
    // Use the selector correctly to get number of items
    const numberOfItems = useSelector(selectNumberOfItems);

    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen
                name="Products"
                component={ProductsScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Cart')}
                            style={{ flexDirection: 'row' }}
                        >
                            <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                            <Text style={{ margin: 5, fontWeight: '500' }}>
                                {numberOfItems}
                            </Text>
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="Cart" component={ShoppingCart} />
        </Stack.Navigator>
    );
};

export default Navigation;


