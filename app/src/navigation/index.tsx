import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListingsScreen from '../screens/ListingsScreen';

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
    Listings: undefined;
};

const Stack = createNativeStackNavigator({
    initialRouteName: 'Welcome',
    screens: {
        Welcome: {
            screen: WelcomeScreen,
        },
        Listings: ListingsScreen,
    },
});

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Listings' component={ListingsScreen} />
        </Stack.Navigator>
    );
}